"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import activities from "../../src/data/activities";

type BeachCondition = "calm" | "windy" | "surf" | "after-rain" | "sunset";
type BeachSuitability = "swimming" | "surfing" | "family" | "quiet";
type BayLocation = "north" | "central" | "south" | "ocean";
type SwellExposure = "low" | "medium" | "high";
type WindDirection = "north" | "northeast" | "east" | "southeast" | "south" | "southwest" | "west" | "northwest";

interface ActivityData {
  id: string;
  title: string;
  type: string;
  beachSuitability: BeachSuitability | null;
  distanceFromHuskissonKm: number | null;
  description: string;
  images: string[];
  tags: string[];
  bayLocation?: BayLocation;
  protectionFromWind?: WindDirection[];
  exposedToWind?: WindDirection[];
  swellExposure?: SwellExposure;
}

interface WeatherDay {
  date: Date;
  dayOfWeek: string;
  tempMax: number;
  tempMin: number;
  cloudCover: number;
  windSpeed: number;
  windDirection: WindDirection;
  rainfallProbability: number;
  weatherCode: number;
  beachScore: number;
}

interface BeachRecommendation {
  beach: ActivityData;
  score: number;
  reasons: string[];
}

const beachConditions: { id: BeachCondition; label: string; icon: string; description: string }[] = [
  { id: "calm", label: "Calm & Sunny", icon: "🌞", description: "Perfect for swimming, SUP, snorkelling & kayaking" },
  { id: "windy", label: "Windy Day", icon: "🌬", description: "Kitesurf conditions" },
  { id: "surf", label: "Big Swell / Surf", icon: "🌊", description: "Surfing conditions" },
  { id: "after-rain", label: "After Rain", icon: "🌧", description: "Clear water returning" },
  { id: "sunset", label: "Sunset Session", icon: "🌅", description: "Golden hour beach time" },
];

function getSuitabilityBadge(suitability: BeachSuitability | null) {
  switch (suitability) {
    case "swimming":
      return { text: "Swimming", className: "bg-cyan-100 text-cyan-700" };
    case "surfing":
      return { text: "Surfing", className: "bg-blue-100 text-blue-700" };
    case "family":
      return { text: "Family", className: "bg-green-100 text-green-700" };
    case "quiet":
      return { text: "Quiet", className: "bg-purple-100 text-purple-700" };
    default:
      return { text: "Beach", className: "bg-gray-100 text-gray-700" };
  }
}

function formatDistance(km: number | null): string {
  if (km === null) return "Location varies";
  if (km === 0) return "In Huskisson";
  if (km <= 10) return `~${km} km from Huskisson`;
  if (km <= 30) return `~${Math.round(km / 5) * 5} min drive`;
  if (km <= 100) return `~${Math.round(km / 60)} hr drive`;
  return `~${Math.round(km / 60)}–${Math.round(km / 45)} hr drive`;
}

function getRecommendedSuitability(condition: BeachCondition): BeachSuitability[] {
  switch (condition) {
    case "calm":
      return ["swimming", "family"];
    case "windy":
      return ["surfing", "quiet"];
    case "surf":
      return ["surfing"];
    case "after-rain":
      return ["swimming", "quiet"];
    case "sunset":
      return ["quiet", "family"];
    default:
      return [];
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" });
}

function getWeatherIcon(code: number): string {
  if (code <= 3) return "☀️";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌧";
  if (code <= 86) return "❄️";
  if (code <= 99) return "⛈";
  return "☀️";
}

function getWeatherDescription(code: number): string {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 67) return "Rainy";
  if (code <= 82) return "Heavy rain";
  if (code <= 99) return "Thunderstorm";
  return "Clear";
}

// Auto-detect condition from weather data
export function autoDetectCondition(day: Omit<WeatherDay, "beachScore">): BeachCondition {
  if (day.rainfallProbability > 50 || day.weatherCode > 60) return "after-rain";
  if (day.windSpeed > 25) return "windy";
  if (day.windSpeed > 20 && day.cloudCover > 70) return "surf";
  if (day.cloudCover < 30 && day.windSpeed < 15) return "calm";
  if (day.cloudCover < 50 && day.windSpeed < 20) return "calm";
  if (day.windSpeed > 15) return "windy";
  return "calm";
}

// Calculate beach score with wind and swell considerations
export function calculateBeachScoreWithReasons(
  beach: ActivityData,
  day: Omit<WeatherDay, "beachScore">
): BeachRecommendation {
  let score = 50; // Base score
  const reasons: string[] = [];

  // Temperature scoring: optimal around 25°C
  const tempOptimal = 25;
  const tempDiff = Math.abs(day.tempMax - tempOptimal);
  const tempScore = Math.max(0, 25 - tempDiff * 2);
  score += tempScore;
  if (tempScore >= 20) {
    reasons.push(`${day.tempMax}°C warm temperatures`);
  } else if (tempScore >= 10) {
    reasons.push(`${day.tempMax}°C mild temperatures`);
  }

  // Cloud cover: lower is better
  const cloudScore = Math.max(0, 15 - day.cloudCover * 0.15);
  score += cloudScore;
  if (day.cloudCover < 30) {
    reasons.push("Mostly sunny skies");
  } else if (day.cloudCover < 60) {
    reasons.push("Partly cloudy");
  }

  // Rainfall probability: lower is better
  const rainScore = Math.max(0, 15 - day.rainfallProbability * 0.15);
  score += rainScore;
  if (day.rainfallProbability < 20) {
    reasons.push("Low rain chance");
  }

  // Wind speed: lower is better for swimming/family beaches
  const windScore = Math.max(0, 10 - day.windSpeed * 0.5);
  score += windScore;
  if (day.windSpeed < 15) {
    reasons.push(`Light ${day.windDirection} winds`);
  } else if (day.windSpeed < 25) {
    reasons.push(`Moderate ${day.windDirection} winds`);
  } else {
    reasons.push(`Strong ${day.windDirection} winds`);
  }

  // Wind direction considerations based on beach location
  if (beach.protectionFromWind && beach.exposedToWind) {
    const isProtected = beach.protectionFromWind.includes(day.windDirection);
    const isExposed = beach.exposedToWind.includes(day.windDirection);

    if (isProtected) {
      score += 10;
      if (day.windSpeed > 15) {
        reasons.push(`Protected from ${day.windDirection} winds`);
      }
    } else if (isExposed) {
      score -= 10;
      if (day.windSpeed > 15) {
        reasons.push(`Exposed to ${day.windDirection} winds`);
      }
    }
  }

  // Bay location wind logic
  if (beach.bayLocation && day.windSpeed > 20) {
    if (day.windDirection === "north" || day.windDirection === "northeast") {
      // Strong northerly winds - favour southern beaches
      if (beach.bayLocation === "south") {
        score += 8;
        reasons.push("Southern bay location calmer in northerly winds");
      } else if (beach.bayLocation === "north") {
        score -= 5;
        reasons.push("Northern bay exposed to northerly chop");
      }
    } else if (day.windDirection === "south" || day.windDirection === "southeast") {
      // Strong southerly winds - favour northern beaches
      if (beach.bayLocation === "north") {
        score += 8;
        reasons.push("Northern bay calmer in southerly winds");
      } else if (beach.bayLocation === "south") {
        score -= 5;
        reasons.push("Southern bay exposed to southerly swell");
      }
    }
  }

  // Swell exposure considerations
  if (beach.swellExposure) {
    // TODO: Future enhancement - use actual swell height from API
    // For now, use wind speed as proxy for conditions
    if (day.windSpeed > 25 && beach.swellExposure === "high") {
      if (beach.beachSuitability === "surfing") {
        score += 10;
        reasons.push("Good surf conditions with swell");
      } else {
        score -= 15;
        reasons.push("Rough conditions for swimming");
      }
    } else if (day.windSpeed < 15 && beach.swellExposure === "low") {
      score += 5;
      reasons.push("Calm protected conditions");
    }
  }

  // TODO: Future enhancement - incorporate tide times, swell direction, swell height, rainfall history

  return {
    beach,
    score: Math.min(100, Math.max(0, Math.round(score))),
    reasons,
  };
}

// Convert wind degrees to direction
function windDegreesToDirection(degrees: number): WindDirection {
  if (degrees >= 337.5 || degrees < 22.5) return "north";
  if (degrees >= 22.5 && degrees < 67.5) return "northeast";
  if (degrees >= 67.5 && degrees < 112.5) return "east";
  if (degrees >= 112.5 && degrees < 157.5) return "southeast";
  if (degrees >= 157.5 && degrees < 202.5) return "south";
  if (degrees >= 202.5 && degrees < 247.5) return "southwest";
  if (degrees >= 247.5 && degrees < 292.5) return "west";
  return "northwest";
}

// Fetch real weather data from Open-Meteo API
async function fetchWeatherForecast(startDate: Date, days: number): Promise<{ forecast: WeatherDay[]; endpoint: string; fetchTime: string }> {
  const latitude = -35.0833;
  const longitude = 150.7167;
  const fetchTime = new Date().toISOString();

  const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode,cloudcover_max,wind_speed_10m_max,wind_direction_10m_dominant&timezone=Australia%2FSydney&forecast_days=${Math.min(days, 7)}`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  const forecast: WeatherDay[] = [];
  const daily = data.daily;

  for (let i = 0; i < daily.time.length; i++) {
    const date = new Date(daily.time[i] + "T00:00:00");
    const tempMax = Math.round(daily.temperature_2m_max[i]);
    const tempMin = Math.round(daily.temperature_2m_min[i]);
    const cloudCover = Math.round(daily.cloudcover_max[i] || 0);
    const windSpeed = Math.round(daily.wind_speed_10m_max[i] || 0);
    const windDirectionDeg = daily.wind_direction_10m_dominant[i] || 0;
    const windDirection = windDegreesToDirection(windDirectionDeg);
    const rainfallProbability = Math.round(daily.precipitation_probability_max[i] || 0);
    const weatherCode = daily.weathercode[i] || 0;

    const day: Omit<WeatherDay, "beachScore"> = {
      date,
      dayOfWeek: date.toLocaleDateString("en-AU", { weekday: "long" }),
      tempMax,
      tempMin,
      cloudCover,
      windSpeed,
      windDirection,
      rainfallProbability,
      weatherCode,
    };

    forecast.push({
      ...day,
      beachScore: calculateBeachScoreWithReasons(
        { id: "temp", title: "", type: "beach", beachSuitability: "swimming", distanceFromHuskissonKm: 0, description: "", images: [], tags: [] },
        day
      ).score,
    });
  }

  return { forecast, endpoint, fetchTime };
}

export default function BestBeachesContent() {
  const [selectedCondition, setSelectedCondition] = useState<BeachCondition>("calm");
  const [selectedSuitability, setSelectedSuitability] = useState<BeachSuitability | "all">("all");
  const [arrivalDate, setArrivalDate] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<string>("");
  const [weatherForecast, setWeatherForecast] = useState<WeatherDay[]>([]);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [weatherEndpoint, setWeatherEndpoint] = useState<string>("");
  const [weatherFetchTime, setWeatherFetchTime] = useState<string>("");
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [beachRecommendations, setBeachRecommendations] = useState<BeachRecommendation[]>([]);

  const typedActivities = activities as ActivityData[];

  // Filter to only beach-type activities
  const beachActivities = useMemo(() => {
    return typedActivities.filter((a) => a.type === "beach" || a.beachSuitability !== null);
  }, [typedActivities]);

  // Filter by condition and suitability
  const filteredBeaches = useMemo(() => {
    let result = beachActivities;

    if (selectedSuitability !== "all") {
      result = result.filter((a) => a.beachSuitability === selectedSuitability);
    }

    return result;
  }, [beachActivities, selectedSuitability]);

  // Get recommended suitability based on condition
  const recommendedSuitability = useMemo(() => {
    return getRecommendedSuitability(selectedCondition);
  }, [selectedCondition]);

  // Calculate stay duration
  const stayDuration = useMemo(() => {
    if (!arrivalDate || !departureDate) return null;
    const arrival = new Date(arrivalDate);
    const departure = new Date(departureDate);
    const diffTime = Math.abs(departure.getTime() - arrival.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, [arrivalDate, departureDate]);

  // Find best beach day during stay
  const bestBeachDay = useMemo(() => {
    if (weatherForecast.length === 0) return null;
    return weatherForecast.reduce((best, day) =>
      day.beachScore > best.beachScore ? day : best
    );
  }, [weatherForecast]);

  // Calculate beach recommendations when weather, filters, or selected day changes
  useEffect(() => {
    if (weatherForecast.length > 0 && beachActivities.length > 0) {
      // Use selected day's weather for recommendations
      const dayWeather = weatherForecast[selectedDayIndex];

      const recommendations = beachActivities.map((beach) =>
        calculateBeachScoreWithReasons(beach, dayWeather)
      );

      // Sort by score descending
      recommendations.sort((a, b) => b.score - a.score);

      setBeachRecommendations(recommendations);

      // Auto-detect condition from weather
      const detectedCondition = autoDetectCondition(dayWeather);
      setSelectedCondition(detectedCondition);
    } else {
      setBeachRecommendations([]);
    }
  }, [weatherForecast, beachActivities, selectedDayIndex]);

  // Fetch weather when dates change
  useEffect(() => {
    if (arrivalDate && departureDate && stayDuration && stayDuration > 0 && stayDuration <= 14) {
      setIsLoadingWeather(true);
      setWeatherError(null);

      fetchWeatherForecast(new Date(arrivalDate), stayDuration)
        .then(({ forecast, endpoint, fetchTime }) => {
          setWeatherForecast(forecast);
          setWeatherEndpoint(endpoint);
          setWeatherFetchTime(fetchTime);
          setIsLoadingWeather(false);
        })
        .catch((error) => {
          setWeatherError(error.message || "Failed to fetch weather data");
          setWeatherForecast([]);
          setIsLoadingWeather(false);
        });
    } else {
      setWeatherForecast([]);
      setWeatherError(null);
    }
  }, [arrivalDate, departureDate, stayDuration]);

  const toggleSuitability = (suitability: BeachSuitability) => {
    setSelectedSuitability(selectedSuitability === suitability ? "all" : suitability);
  };

  const suitabilityOptions: BeachSuitability[] = ["swimming", "surfing", "family", "quiet"];

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split("T")[0];

  // Calculate max date (7 days from today) for reliable forecasts
  const maxDateObj = new Date();
  maxDateObj.setDate(maxDateObj.getDate() + 7);
  const maxDate = maxDateObj.toISOString().split("T")[0];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 text-white"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(8, 145, 178, 0.85) 0%, rgba(79, 70, 229, 0.85) 100%),
            url('/Crystal_Clear_Hyams_Beach_White_Sand.jpg')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            Condition-Based Guide
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Best Beaches in Jervis Bay
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-90">
            There is no single best beach — only the best beach for today's conditions.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stay Dates & Weather Section */}
      <section className="py-12 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Plan Your Beach Trip</h2>
            <p className="text-gray-600">Enter your stay dates to find the best beach day</p>
          </div>

          {/* Date Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 max-w-2xl mx-auto">
            <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800">
              <span className="font-semibold">📍 Reliable forecasts:</span> Weather data is most accurate within the next 7 days. Dates beyond this range may have limited forecast reliability.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Arrival Date</label>
                <input
                  type="date"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  min={today}
                  max={maxDate}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Departure Date</label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  min={arrivalDate || today}
                  max={maxDate}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="flex items-end">
                {stayDuration && (
                  <div className="w-full text-center p-3 bg-blue-50 rounded-xl">
                    <span className="text-2xl font-bold text-blue-600">{stayDuration}</span>
                    <span className="text-sm text-gray-600 ml-1">
                      {stayDuration === 1 ? "day" : "days"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Weather Forecast - Clickable Days */}
          {weatherForecast.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-gray-900">Weather Forecast for Your Stay</h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Live Weather Data
                </span>
              </div>
              <p className="text-sm text-gray-500 text-center mb-6">
                Click on a day to see beach recommendations for that day
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {weatherForecast.map((day, index) => {
                  const isBestDay = bestBeachDay && day.date.getTime() === bestBeachDay.date.getTime();
                  const isSelected = index === selectedDayIndex;

                  // Determine styling based on state
                  let containerClass = "bg-gray-50 hover:bg-gray-100";
                  if (isSelected && isBestDay) {
                    containerClass = "bg-gradient-to-br from-cyan-100 to-yellow-100 border-2 border-cyan-400 ring-2 ring-yellow-300";
                  } else if (isSelected) {
                    containerClass = "bg-gradient-to-br from-cyan-100 to-blue-100 border-2 border-cyan-400";
                  } else if (isBestDay) {
                    containerClass = "bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-400";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedDayIndex(index)}
                      className={`p-3 rounded-xl text-center transition-all cursor-pointer ${containerClass}`}
                    >
                      <div className="text-xs text-gray-500 mb-1">
                        {day.dayOfWeek.slice(0, 3)}
                      </div>
                      <div className="text-2xl mb-1">{getWeatherIcon(day.weatherCode)}</div>
                      <div className="text-sm font-bold text-gray-900">{day.tempMax}°</div>
                      <div className="text-xs text-gray-500">{day.windSpeed} km/h</div>
                      <div className="text-xs text-gray-400">☁️ {day.cloudCover}%</div>
                      {isBestDay && isSelected && (
                        <div className="text-xs font-semibold mt-1">
                          <span className="text-cyan-700">⭐ Selected</span>
                          <span className="text-yellow-700 ml-1">& Best</span>
                        </div>
                      )}
                      {isBestDay && !isSelected && (
                        <div className="text-xs text-yellow-700 font-semibold mt-1">⭐ Best</div>
                      )}
                      {isSelected && !isBestDay && (
                        <div className="text-xs text-cyan-700 font-semibold mt-1">Selected</div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected Day Summary */}
              {weatherForecast[selectedDayIndex] && (
                <div className="mt-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">
                      {selectedDayIndex === 0 ? "📍 Today's" : `📍 ${formatDate(weatherForecast[selectedDayIndex].date)}`} Recommendations
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-2 text-sm text-gray-700">
                      <span>{getWeatherIcon(weatherForecast[selectedDayIndex].weatherCode)} {getWeatherDescription(weatherForecast[selectedDayIndex].weatherCode)}</span>
                      <span>🌡️ {weatherForecast[selectedDayIndex].tempMax}°C</span>
                      <span>💨 {weatherForecast[selectedDayIndex].windSpeed} km/h {weatherForecast[selectedDayIndex].windDirection}</span>
                      <span>☁️ {weatherForecast[selectedDayIndex].cloudCover}% clouds</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {isLoadingWeather && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-2 text-gray-600">Fetching live weather data...</p>
            </div>
          )}

          {weatherError && (
            <div className="text-center py-8 bg-red-50 rounded-xl border border-red-200">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Weather Data Unavailable</h3>
              <p className="text-red-600 text-sm mb-4">{weatherError}</p>
              <p className="text-gray-500 text-xs">Please try again later or check your internet connection.</p>
            </div>
          )}
        </div>
      </section>

      {/* Condition Selector - Auto-detected from weather */}
      <section className="py-12 px-6 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Today's Conditions</h2>
            <p className="text-gray-600">Automatically detected from weather forecast</p>
          </div>

          {/* Condition Display - Auto-detected */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {beachConditions.map((condition) => (
              <div
                key={condition.id}
                className={`px-5 py-3 rounded-xl transition-all duration-300 ${
                  selectedCondition === condition.id
                    ? "bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-400 shadow-sm border border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{condition.icon}</span>
                  <div className="text-left">
                    <div className="font-semibold text-sm">{condition.label}</div>
                    <div className={`text-xs ${selectedCondition === condition.id ? "text-white/80" : "text-gray-400"}`}>
                      {condition.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommended Beach for Selected Day */}
          {beachRecommendations.length > 0 && weatherForecast.length > 0 && (
            <div className="mt-12 max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 md:p-8 border-2 border-emerald-200 shadow-md">
                <div className="text-center mb-6">
                  <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider uppercase bg-emerald-100 text-emerald-700 rounded-full">
                    Recommended Beach {selectedDayIndex === 0 ? "Today" : `for ${formatDate(weatherForecast[selectedDayIndex].date)}`}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {beachRecommendations[0]?.beach.title}
                  </h3>
                  <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
                    <span>📍 {formatDistance(beachRecommendations[0]?.beach.distanceFromHuskissonKm)}</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs font-semibold">
                      Score: {beachRecommendations[0]?.score}/100
                    </span>
                  </div>
                </div>

                {/* Weather context */}
                <div className="bg-white/70 rounded-xl p-4 mb-6">
                  <div className="text-sm font-semibold text-gray-700 mb-2 text-center">Conditions That Day</div>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    <span>🌡️ {weatherForecast[selectedDayIndex]?.tempMax}°C</span>
                    <span>💨 {weatherForecast[selectedDayIndex]?.windSpeed} km/h {weatherForecast[selectedDayIndex]?.windDirection}</span>
                    <span>☁️ {weatherForecast[selectedDayIndex]?.cloudCover}% cloud cover</span>
                    <span>🌧 {weatherForecast[selectedDayIndex]?.rainfallProbability}% rain chance</span>
                  </div>
                </div>

                {/* Why this beach */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center justify-center gap-2">
                    <span>💡</span> Why this beach?
                  </h4>
                  <ul className="space-y-2">
                    {beachRecommendations[0]?.reasons.map((reason, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-emerald-500 mt-0.5">✓</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Second and third options */}
                {beachRecommendations.length > 2 && (
                  <div className="mt-6 pt-6 border-t border-emerald-200">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">Also good that day:</h4>
                    <div className="flex flex-wrap gap-2">
                      {beachRecommendations.slice(1, 4).map((rec, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-white rounded-lg text-sm text-gray-700 border border-emerald-100"
                        >
                          {rec.beach.title} <span className="text-xs text-gray-500">({rec.score})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Condition-based recommendation header */}
          <div className="mb-10 text-center">
            <div className="inline-block bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl px-6 py-4 border border-cyan-100">
              <p className="text-gray-700">
                <span className="font-semibold text-gray-900">
                  {beachConditions.find((c) => c.id === selectedCondition)?.icon}{" "}
                  {beachConditions.find((c) => c.id === selectedCondition)?.label}:
                </span>{" "}
                Best for{" "}
                <span className="font-semibold text-cyan-700">
                  {recommendedSuitability.map((s) => getSuitabilityBadge(s).text).join(" & ")}
                </span>
              </p>
            </div>
          </div>

          {filteredBeaches.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🏖</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No beaches found</h3>
              <p className="text-gray-600">Try selecting a different condition or beach type.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBeaches.map((beach) => {
                const badge = getSuitabilityBadge(beach.beachSuitability);
                const isRecommended = beach.beachSuitability && recommendedSuitability.includes(beach.beachSuitability);
                return (
                  <div
                    key={beach.id}
                    className={`bg-white rounded-2xl shadow-sm border p-5 hover:shadow-lg transition-shadow duration-300 ${
                      isRecommended ? "border-cyan-300" : "border-gray-200"
                    }`}
                  >
                    {beach.images.length > 0 ? (
                      <div className="mb-4 rounded-xl overflow-hidden">
                        <img
                          src={beach.images[0]}
                          alt={beach.title}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    ) : (
                      <div className="mb-4 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 h-40 flex items-center justify-center">
                        <span className="text-4xl">🏖</span>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${badge.className}`}>
                        {badge.text}
                      </span>
                      {isRecommended && (
                        <span className="px-2 py-1 rounded-md text-xs font-semibold bg-cyan-100 text-cyan-700">
                          Recommended
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{beach.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <span>📍</span>
                      <span>{formatDistance(beach.distanceFromHuskissonKm)}</span>
                    </div>
                    {beach.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {beach.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="text-xs text-gray-500">#{tag}</span>
                        ))}
                      </div>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed">{beach.description}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-4xl">🏖</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            The Best Beach Depends on Today
          </h2>
          <div className="w-24 h-1 bg-white/30 mx-auto rounded-full mb-6"></div>
          <p className="text-lg leading-relaxed opacity-95 mb-8">
            Jervis Bay's beaches each have their own character. Wind direction, swell, tides, and recent weather
            all influence which beach is best on any given day. Use the condition selector above to find your
            perfect beach for today's conditions.
          </p>
          {/* TODO: Future enhancement - add real-time swell direction, swell height, tide times, and wind direction for more precise recommendations */}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3.5 bg-white text-cyan-700 font-semibold rounded-full hover:bg-cyan-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Back to Home
            </Link>
            <Link
              href="/dog-friendly"
              className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Dog Friendly Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-10 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-2">Planning your Jervis Bay beach day?</p>
          <p className="text-sm text-gray-500">Check out our other guides for more things to do in the region.</p>
        </div>
      </section>

      {/* Weather Debug Section */}
      {weatherForecast.length > 0 && (
        <section className="py-10 px-6 bg-gray-100 border-t border-gray-300">
          <div className="max-w-4xl mx-auto">
            <details className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <summary className="px-6 py-4 bg-gray-50 cursor-pointer font-semibold text-gray-700 flex items-center justify-between hover:bg-gray-100 transition-colors">
                <span>🔧 Weather Debug Panel</span>
                <span className="text-sm text-gray-500 font-normal">Click to expand</span>
              </summary>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Raw Weather Data</h3>

                {/* API Info */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">API Configuration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Provider:</span>
                      <span className="ml-2 font-mono text-green-700 font-semibold">Open-Meteo (Live)</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span>
                      <span className="ml-2 inline-flex items-center gap-1 font-mono text-green-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Connected
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Latitude:</span>
                      <span className="ml-2 font-mono text-gray-900">-35.0833</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Longitude:</span>
                      <span className="ml-2 font-mono text-gray-900">150.7167</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Location:</span>
                      <span className="ml-2 font-mono text-gray-900">Jervis Bay, NSW</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Timezone:</span>
                      <span className="ml-2 font-mono text-gray-900">Australia/Sydney</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Fetched:</span>
                      <span className="ml-2 font-mono text-gray-900 text-xs">{weatherFetchTime ? new Date(weatherFetchTime).toLocaleString('en-AU') : 'N/A'}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <span className="text-gray-500 text-xs">API Endpoint:</span>
                    <div className="mt-1 p-2 bg-white rounded border border-blue-100 overflow-x-auto">
                      <code className="text-xs font-mono text-gray-700 break-all">{weatherEndpoint}</code>
                    </div>
                  </div>
                </div>

                {/* Daily Forecast Data */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Date</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Weather Code</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Max Temp (°C)</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Min Temp (°C)</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Rain Prob (%)</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Wind Speed (km/h)</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Wind Dir</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700">Cloud Cover (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weatherForecast.map((day, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-3 py-2 font-mono text-gray-900">{day.dayOfWeek}</td>
                          <td className="px-3 py-2 font-mono text-gray-900">{day.weatherCode}</td>
                          <td className="px-3 py-2 font-mono text-gray-900">{day.tempMax}</td>
                          <td className="px-3 py-2 font-mono text-gray-900">{day.tempMin}</td>
                          <td className="px-3 py-2 font-mono text-gray-900">{day.rainfallProbability}</td>
                          <td className="px-3 py-2 font-mono text-gray-900">{day.windSpeed}</td>
                          <td className="px-3 py-2 font-mono text-gray-900">{day.windDirection}</td>
                          <td className="px-3 py-2 font-mono text-gray-900">{day.cloudCover}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Weather Code Reference */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-2">Weather Code Reference</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-600">
                    <div><span className="font-mono">0:</span> Clear sky</div>
                    <div><span className="font-mono">1-3:</span> Partly cloudy</div>
                    <div><span className="font-mono">45,48:</span> Foggy</div>
                    <div><span className="font-mono">51-67:</span> Drizzle/Rain</div>
                    <div><span className="font-mono">71-77:</span> Snow</div>
                    <div><span className="font-mono">80-82:</span> Rain showers</div>
                    <div><span className="font-mono">85,86:</span> Snow showers</div>
                    <div><span className="font-mono">95-99:</span> Thunderstorm</div>
                  </div>
                </div>

                {/* Notes */}
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200 text-sm text-green-800">
                  <strong>✓ Live Data:</strong> Weather values shown above are fetched in real-time from the Open-Meteo API.
                  Data is cached by the browser and refreshed when new dates are selected.
                </div>
              </div>
            </details>
          </div>
        </section>
      )}
    </main>
  );
}
