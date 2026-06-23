"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import activities from "../../src/data/activities";

// ==========================================
// TYPES
// ==========================================

interface ActivityData {
  id: string;
  title: string;
  type: string;
  description: string;
  images: string[];
  tags: string[];
  distanceFromHuskissonKm: number | null;
  timeRequiredHours: number | null;
  costCategory: string;
  freeCategory?: string[];
  ranking?: number;
  intensity?: string | null;
  bayLocation?: string;
  experienceType?: string;
  iconicCategory?: string[];
}

type InterestType = "beaches" | "walks" | "hidden-gems" | "water-activities" | "wildlife";
type TravelStyle = "relaxed" | "balanced" | "busy";
type AccommodationLocation = "huskisson" | "vincentia" | "callala-bay" | "hyams-beach" | "booderee" | "campervan";
type EnergyLevel = "low" | "medium" | "high";

interface WizardData {
  tripLength: number;
  customTripLength: number | null;
  startDate: string;
  interests: InterestType[];
  travelStyle: TravelStyle;
  accommodation: AccommodationLocation;
  startTime: string;
  endTime: string;
  dinnerTime: string;
  beachPriority: boolean;
  beachPriorityDay: number;
  okWithLongDrives: boolean;
  completedActivities: string[];
}

interface ScheduledActivity {
  activity: ActivityData;
  timeSlot: "morning" | "afternoon" | "evening";
  displayTime?: string;
}

interface DayItinerary {
  day: number;
  activities: ScheduledActivity[];
}

// ==========================================
// CONSTANTS
// ==========================================

const interests = [
  { id: "beaches" as InterestType, label: "Beaches", icon: "🏖️" },
  { id: "walks" as InterestType, label: "Walks & Hikes", icon: "🥾" },
  { id: "hidden-gems" as InterestType, label: "Hidden Gems", icon: "💎" },
  { id: "water-activities" as InterestType, label: "Water Activities", icon: "🚣" },
  { id: "wildlife" as InterestType, label: "Wildlife", icon: "🐬" },
];

const travelStyles: { id: TravelStyle; label: string; description: string; activitiesPerDay: number }[] = [
  { id: "relaxed", label: "Relaxed", description: "1-2 activities, lots of free time", activitiesPerDay: 2 },
  { id: "balanced", label: "Balanced", description: "2-3 activities, moderate pace", activitiesPerDay: 3 },
  { id: "busy", label: "Busy", description: "3-5 activities, full days", activitiesPerDay: 5 },
];

const accommodations: { id: AccommodationLocation; label: string; distanceFromHuskisson: number }[] = [
  { id: "huskisson", label: "Huskisson", distanceFromHuskisson: 0 },
  { id: "vincentia", label: "Vincentia", distanceFromHuskisson: 5 },
  { id: "callala-bay", label: "Callala Bay", distanceFromHuskisson: 10 },
  { id: "hyams-beach", label: "Hyams Beach", distanceFromHuskisson: 12 },
  { id: "booderee", label: "Booderee Area", distanceFromHuskisson: 20 },
  { id: "campervan", label: "Campervan / Flexible", distanceFromHuskisson: 0 },
];

const STEPS = [
  { number: 1, title: "Trip Length", icon: "📅" },
  { number: 2, title: "Interests", icon: "❤️" },
  { number: 3, title: "Travel Style", icon: "🎒" },
  { number: 4, title: "Accommodation", icon: "🏠" },
  { number: 5, title: "Daily Schedule", icon: "⏰" },
  { number: 6, title: "Preferences", icon: "⚡" },
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function getActivityCategory(activity: ActivityData): InterestType[] {
  const categories: InterestType[] = [];
  
  if (activity.type === "beach" || activity.freeCategory?.includes("beaches")) {
    categories.push("beaches");
  }
  if (["walk", "hike", "run", "bike"].includes(activity.type) || activity.freeCategory?.includes("walks-hikes")) {
    categories.push("walks");
  }
  if (activity.experienceType === "hidden-gem" || activity.tags.includes("hidden")) {
    categories.push("hidden-gems");
  }
  if (["iconic"].includes(activity.type) && (activity.iconicCategory?.includes("marine") || activity.iconicCategory?.includes("paddling"))) {
    categories.push("water-activities");
  }
  if (activity.freeCategory?.includes("wildlife-nature") || activity.tags.includes("wildlife")) {
    categories.push("wildlife");
  }
  
  return categories;
}

function getEffortLevel(activity: ActivityData): EnergyLevel {
  switch (activity.intensity) {
    case "easy": return "low";
    case "moderate": return "medium";
    case "hard": return "high";
    default: return "medium";
  }
}

function getTravelIntensity(activity: ActivityData): "local" | "moderate" | "long" {
  const km = activity.distanceFromHuskissonKm;
  if (km === null) return "local";
  if (km <= 15) return "local";
  if (km <= 50) return "moderate";
  return "long";
}

function formatTimeSlot(slot: "morning" | "afternoon" | "evening"): string {
  switch (slot) {
    case "morning": return "Morning";
    case "afternoon": return "Afternoon";
    case "evening": return "Evening";
  }
}

function getWeekdayName(dateStr: string, offset: number): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + offset);
  return date.toLocaleDateString('en-AU', { weekday: 'long' });
}

function getFormattedDay(dateStr: string, offset: number): string {
  const weekday = getWeekdayName(dateStr, offset);
  return `${weekday} (Day ${offset + 1})`;
}

// ==========================================
// ITINERARY GENERATION LOGIC - PHYSICAL FATIGUE BUDGET
// ==========================================

// Define day themes for variety
const dayThemes = [
  "mixed",      // Mix of different activities
  "beach",      // Beach-focused
  "active",     // Walks and active pursuits
  "relaxed",    // Lighter schedule
  "exploration" // Hidden gems and exploration
];

// Activity types that are "support" activities (food, rest, transitions)
const supportTypes = ["food", "rest"];

function isSupportActivity(activity: ActivityData): boolean {
  return supportTypes.includes(activity.type) || activity.experienceType === "itinerary-support";
}

// ==========================================
// PHYSICAL FATIGUE BUDGET SYSTEM
// ==========================================

// Physical load values for activities
type PhysicalLoad = 1 | 2 | 3 | 4 | 5;

// ==========================================
// EXPLICIT CONFLICT RULES - Hard-coded exclusions
// These activities CANNOT appear on the same day
// ==========================================
const activityConflicts: { [key: string]: string[] } = {
  // Booderee Coastal Loop conflicts with other long walks
  "booderee-coastal-loop": [
    "scribbly-gum-white-sands",
    "plantation-hyams-extension",
    "gosangs-abrahams",
    "point-perpendicular",
    "cape-st-george",
    "elizabeth-drive-half-marathon",
    "fitzroy-falls",
  ],
  // Scribbly Gum Track conflicts with other long walks
  "scribbly-gum-white-sands": [
    "booderee-coastal-loop",
    "plantation-hyams-extension",
    "gosangs-abrahams",
    "point-perpendicular",
    "cape-st-george",
    "elizabeth-drive-half-marathon",
  ],
  // Plantation-Hyams Extension conflicts
  "plantation-hyams-extension": [
    "booderee-coastal-loop",
    "scribbly-gum-white-sands",
    "gosangs-abrahams",
    "point-perpendicular",
    "cape-st-george",
  ],
  // Other long walks that conflict
  "gosangs-abrahams": [
    "booderee-coastal-loop",
    "scribbly-gum-white-sands",
    "plantation-hyams-extension",
    "point-perpendicular",
    "cape-st-george",
  ],
  "point-perpendicular": [
    "booderee-coastal-loop",
    "scribbly-gum-white-sands",
    "plantation-hyams-extension",
    "gosangs-abrahams",
    "cape-st-george",
  ],
  "cape-st-george": [
    "booderee-coastal-loop",
    "scribbly-gum-white-sands",
    "plantation-hyams-extension",
    "gosangs-abrahams",
    "point-perpendicular",
  ],
  "elizabeth-drive-half-marathon": [
    "booderee-coastal-loop",
    "scribbly-gum-white-sands",
    "plantation-hyams-extension",
    "gosangs-abrahams",
  ],
  "fitzroy-falls": [
    "booderee-coastal-loop",
    "scribbly-gum-white-sands",
    "plantation-hyams-extension",
  ],
};

function getConflictingActivities(activityId: string): string[] {
  return activityConflicts[activityId] || [];
}

function hasActivityConflict(activity: ActivityData, existingActivityIds: Set<string>): boolean {
  // Check if this activity conflicts with any already selected
  const conflicts = getConflictingActivities(activity.id);
  for (const existingId of existingActivityIds) {
    if (conflicts.includes(existingId)) return true;
    // Also check reverse - if existing activity conflicts with this one
    const reverseConflicts = getConflictingActivities(existingId);
    if (reverseConflicts.includes(activity.id)) return true;
  }
  return false;
}

function getPhysicalLoad(activity: ActivityData): PhysicalLoad {
  // Support activities (food, rest) are always LOW
  if (isSupportActivity(activity)) return 1;
  
  // Calculate based on intensity and duration
  const intensity = activity.intensity;
  const hours = activity.timeRequiredHours || 0;
  const travelIntensity = getTravelIntensity(activity);
  
  // EXTREME (5): 12km+ hikes, national park loops, full-day walks
  if (intensity === "hard" && hours >= 3) return 5;
  if (intensity === "hard" && travelIntensity === "long") return 5;
  if (hours >= 4) return 5; // Full-day activity
  
  // HIGH (4): long hikes, 8km+ walks, strenuous activity
  if (intensity === "hard") return 4;
  if (hours >= 3) return 4;
  if (travelIntensity === "long") return 4;
  
  // MEDIUM (2-3): standard coastal walks, light hikes
  if (intensity === "moderate" && hours >= 2) return 3;
  if (intensity === "moderate" && travelIntensity === "moderate") return 3;
  if (intensity === "moderate") return 2;
  
  // LOW (1): beaches, cafes, short strolls
  return 1;
}

function isHighOrExtremeActivity(activity: ActivityData): boolean {
  const load = getPhysicalLoad(activity);
  return load >= 4;
}

function getActivityEffortLevel(activity: ActivityData): "low" | "medium" | "high" {
  if (isSupportActivity(activity)) return "low";
  if (isHighOrExtremeActivity(activity)) return "high";
  return getEffortLevel(activity);
}

function generateItinerary(wizard: WizardData): DayItinerary[] {
  const typedActivities = activities as ActivityData[];
  const itinerary: DayItinerary[] = [];
  
  // Separate attraction activities from support activities
  const attractionActivities = typedActivities.filter(a => !isSupportActivity(a));
  const supportActivities = typedActivities.filter(a => isSupportActivity(a));
  
  // Filter attraction activities based on preferences
  let availableAttractions = attractionActivities.filter((a) => {
    // Filter by interests
    const activityCategories = getActivityCategory(a);
    if (wizard.interests.length > 0) {
      const matchesInterest = wizard.interests.some((interest) => activityCategories.includes(interest));
      if (!matchesInterest && activityCategories.length > 0) {
        return false;
      }
    }
    
    // Filter by long drives preference
    if (!wizard.okWithLongDrives) {
      const travelIntensity = getTravelIntensity(a);
      if (travelIntensity === "long") {
        return false;
      }
    }
    
    return true;
  });
  
  // Sort attractions by ranking (higher is better)
  availableAttractions.sort((a, b) => (b.ranking || 0) - (a.ranking || 0));
  
  // Filter support activities (food, rest) - keep all available
  let availableSupport = supportActivities.filter((a) => {
    // Skip paid food/activities that are too generic (rainy day specific)
    if (a.costCategory === "paid" && a.experienceType !== "itinerary-support") {
      return false;
    }
    return true;
  });
  
  // Get accommodation distance for proximity sorting
  const accommodation = accommodations.find((a) => a.id === wizard.accommodation);
  const baseDistance = accommodation?.distanceFromHuskisson || 0;
  
  // Track used ATTRACTION activities across all days (support activities can repeat)
  const usedAttractionIds = new Set<string>();
  
  // Track category usage per day for variety
  const dayCategoryUsage = new Map<number, string[]>();
  
  // Define day themes based on trip length and preferences
  const tripThemes = assignDayThemes(wizard);
  
  // Generate itinerary for each day
  for (let day = 1; day <= wizard.tripLength; day++) {
    const dayActivities: ScheduledActivity[] = [];
    const dayTheme = tripThemes[day - 1] || "mixed";
    const isBeachDay = wizard.beachPriority && wizard.beachPriorityDay === day;
    const maxAttractions = travelStyles.find((t) => t.id === wizard.travelStyle)?.activitiesPerDay || 3;
    
    // HARD CONSTRAINT TRACKING: Track if this day already has a high-effort activity
    let dayHasHighEffort = false;
    
    // Get remaining unused attraction activities
    let remainingAttractions = availableAttractions.filter(a => !usedAttractionIds.has(a.id));
    
    // If we're running low on attractions, allow revisits
    const allowAttractionRevisits = remainingAttractions.length < maxAttractions;
    if (allowAttractionRevisits) {
      remainingAttractions = [...availableAttractions];
    }
    
    // Filter for beach day if applicable
    let attractionPool = remainingAttractions;
    if (isBeachDay) {
      const beachAttractions = remainingAttractions.filter((a) => 
        a.type === "beach" || getActivityCategory(a).includes("beaches")
      );
      if (beachAttractions.length >= 2) {
        attractionPool = beachAttractions;
      }
    }
    
    // Apply day theme filtering
    attractionPool = applyDayThemeFilter(attractionPool, dayTheme, isBeachDay);
    
    // Balance location priority
    attractionPool = balanceLocations(attractionPool, baseDistance, day, wizard.tripLength);
    
    // Avoid same category as previous day if possible
    const prevDayCategories = dayCategoryUsage.get(day - 1) || [];
    attractionPool = avoidRepeatedCategories(attractionPool, prevDayCategories);
    
    // === BUILD DAY STRUCTURE WITH PRE-SELECTION FILTERING ===
    const dayCategories: string[] = [];
    
    // ==========================================
    // STEP 1: PRE-SELECTION - Identify high-value primary activity FIRST
    // ==========================================
    let primaryHighEffortActivity: ActivityData | null = null;
    
    // Find the best high-effort activity for this day (if any should be included)
    for (const activity of attractionPool) {
      if (usedAttractionIds.has(activity.id) && !allowAttractionRevisits) continue;
      if (!isHighOrExtremeActivity(activity)) continue;
      if (wizard.travelStyle === "relaxed") continue;
      
      // Found a high-effort candidate - select it as the primary
      primaryHighEffortActivity = activity;
      break;
    }
    
    // ==========================================
    // STEP 2: BUILD FILTERED POOL - Remove ALL conflicting activities BEFORE selection
    // ==========================================
    // Track activities selected for this day (for conflict checking)
    const selectedActivityIdsForDay = new Set<string>();
    
    // If primary high-effort activity is selected, add it to the day's selected set
    if (primaryHighEffortActivity) {
      selectedActivityIdsForDay.add(primaryHighEffortActivity.id);
    }
    
    let filteredPool = attractionPool.filter(a => {
      // Remove already used activities (unless revisits allowed)
      if (usedAttractionIds.has(a.id) && !allowAttractionRevisits) return false;
      
      // ==========================================
      // HARD FILTER A: If primary high-effort exists, REMOVE ALL other high-effort
      // ==========================================
      if (primaryHighEffortActivity && isHighOrExtremeActivity(a)) {
        // Remove ALL high/extra effort activities except the primary one
        if (a.id !== primaryHighEffortActivity.id) {
          return false;
        }
      }
      
      // HARD FILTER B: Relaxed travel style excludes all high-effort
      if (wizard.travelStyle === "relaxed" && isHighOrExtremeActivity(a)) {
        return false;
      }
      
      // ==========================================
      // HARD FILTER C: EXPLICIT CONFLICT RULES
      // Remove activities that conflict with already selected activities for this day
      // ==========================================
      if (hasActivityConflict(a, selectedActivityIdsForDay)) {
        return false;
      }
      
      return true;
    });
    
    // ==========================================
    // STEP 3: SORT FILTERED POOL - Primary high-effort first, then by ranking
    // ==========================================
    filteredPool.sort((a, b) => {
      // Primary high-effort activity goes first
      if (a.id === primaryHighEffortActivity?.id) return -1;
      if (b.id === primaryHighEffortActivity?.id) return 1;
      
      // Then sort by ranking (higher is better)
      return (b.ranking || 0) - (a.ranking || 0);
    });
    
    // ==========================================
    // STEP 4: START WITH BREAKFAST
    // ==========================================
    const breakfastOptions = availableSupport.filter(a => 
      a.type === "food" && a.tags.includes("breakfast")
    );
    if (breakfastOptions.length > 0) {
      const breakfast = breakfastOptions[Math.floor(Math.random() * breakfastOptions.length)];
      dayActivities.push({
        activity: breakfast,
        timeSlot: "morning",
      });
    }
    
    // ==========================================
    // STEP 5: SELECT ATTRACTIONS FROM FILTERED POOL ONLY
    // ==========================================
    const timeSlots: ("morning" | "afternoon" | "evening")[] = ["morning", "afternoon", "evening"];
    let attractionCount = 0;
    let highEffortSelected = false;
    
    for (const slot of timeSlots) {
      if (attractionCount >= maxAttractions) break;
      
      // Find best available attraction from FILTERED POOL
      let selectedAttraction: ActivityData | null = null;
      
      for (const activity of filteredPool) {
        // Skip if already selected for this day
        if (dayActivities.some(da => da.activity.id === activity.id)) continue;
        
        // ==========================================
        // HARD CONSTRAINT: Category variety (soft filter)
        // ==========================================
        const activityCats = getActivityCategory(activity);
        const hasCategoryConflict = dayCategories.some(cat => activityCats.includes(cat as any));
        if (hasCategoryConflict && attractionCount < maxAttractions - 1) continue;
        
        selectedAttraction = activity;
        break;
      }
      
      if (selectedAttraction) {
        const isRevisit = usedAttractionIds.has(selectedAttraction.id);
        const activityIsHighEffort = isHighOrExtremeActivity(selectedAttraction);
        
        dayActivities.push({
          activity: selectedAttraction,
          timeSlot: slot,
        });
        
        if (!isRevisit) {
          usedAttractionIds.add(selectedAttraction.id);
        }
        
        // Track this activity as selected for the day (for conflict checking)
        selectedActivityIdsForDay.add(selectedAttraction.id);
        
        // Track if high effort was selected
        if (activityIsHighEffort) {
          highEffortSelected = true;
        }
        
        // Track categories
        const cats = getActivityCategory(selectedAttraction);
        dayCategories.push(...cats);
        attractionCount++;
        
        // ==========================================
        // STEP 6: ADD RECOVERY BREAK AFTER HIGH EFFORT (MANDATORY)
        // ==========================================
        if (activityIsHighEffort && attractionCount < maxAttractions) {
          const recoveryOptions = availableSupport.filter(a => 
            (a.type === "food" && a.tags.includes("coffee")) || 
            a.type === "rest"
          );
          if (recoveryOptions.length > 0) {
            const recovery = recoveryOptions[Math.floor(Math.random() * recoveryOptions.length)];
            const nextSlot = slot === "morning" ? "afternoon" : "evening";
            dayActivities.push({
              activity: recovery,
              timeSlot: nextSlot,
            });
          }
        }
      }
    }
    
    // 4. ADD LUNCH (if not already added)
    const hasLunch = dayActivities.some(a => 
      a.activity.type === "food" && a.activity.tags.includes("lunch")
    );
    if (!hasLunch) {
      const lunchOptions = availableSupport.filter(a => 
        a.type === "food" && a.tags.includes("lunch")
      );
      if (lunchOptions.length > 0) {
        const lunch = lunchOptions[Math.floor(Math.random() * lunchOptions.length)];
        const lunchSlot = dayActivities.length <= 1 ? "afternoon" : 
                          dayActivities.filter(a => a.timeSlot === "afternoon").length === 0 ? "afternoon" : "evening";
        dayActivities.push({
          activity: lunch,
          timeSlot: lunchSlot,
        });
      }
    }
    
    // 5. ADD DINNER/EVENING ACTIVITY
    const hasDinner = dayActivities.some(a => 
      a.activity.type === "food" && a.activity.tags.includes("dinner")
    );
    if (!hasDinner) {
      const dinnerOptions = availableSupport.filter(a => 
        a.type === "food" && a.tags.includes("dinner")
      );
      if (dinnerOptions.length > 0) {
        const dinner = dinnerOptions[Math.floor(Math.random() * dinnerOptions.length)];
        dayActivities.push({
          activity: dinner,
          timeSlot: "evening",
        });
      }
    }
    
    // 6. ADD SUNSET WATCHING if beach day or scenic day
    if (isBeachDay || dayTheme === "exploration") {
      const sunsetOption = availableSupport.find(a => a.id === "sunset-watching");
      if (sunsetOption && !dayActivities.some(a => a.activity.id === "sunset-watching")) {
        dayActivities.push({
          activity: sunsetOption,
          timeSlot: "evening",
        });
      }
    }
    
    // Sort activities by time slot for proper ordering
    dayActivities.sort((a, b) => {
      const slotOrder = { morning: 0, afternoon: 1, evening: 2 };
      return slotOrder[a.timeSlot] - slotOrder[b.timeSlot];
    });
    
    dayCategoryUsage.set(day, dayCategories);
    
    itinerary.push({
      day,
      activities: dayActivities,
    });
  }
  
  return itinerary;
}

// Assign themes to each day for variety
function assignDayThemes(wizard: WizardData): string[] {
  const themes: string[] = [];
  const length = wizard.tripLength;
  
  // Always start with a beach day if it's the first day
  if (wizard.beachPriority && wizard.beachPriorityDay === 1) {
    themes.push("beach");
  } else {
    themes.push("mixed");
  }
  
  // Alternate themes for variety
  const rotation = ["active", "exploration", "relaxed", "beach", "mixed"];
  for (let i = themes.length; i < length; i++) {
    // If this is the designated beach day, use beach theme
    if (wizard.beachPriority && wizard.beachPriorityDay === i + 1) {
      themes.push("beach");
    } else {
      themes.push(rotation[(i - 1) % rotation.length]);
    }
  }
  
  return themes;
}

// Filter activities by day theme
function applyDayThemeFilter(activities: ActivityData[], theme: string, isBeachDay: boolean): ActivityData[] {
  if (isBeachDay) return activities; // Don't filter beach days
  
  switch (theme) {
    case "active":
      // Prioritize walks, hikes, water activities
      return activities.filter(a => 
        ["walk", "hike", "run", "bike"].includes(a.type) || 
        getActivityCategory(a).includes("water-activities")
      ).length > 0 
        ? activities.filter(a => 
            ["walk", "hike", "run", "bike"].includes(a.type) || 
            getActivityCategory(a).includes("water-activities")
          )
        : activities;
    
    case "exploration":
      // Prioritize hidden gems and iconic experiences
      return activities.filter(a => 
        a.experienceType === "hidden-gem" || 
        a.tags.includes("hidden") ||
        a.type === "iconic"
      ).length > 0
        ? activities.filter(a => 
            a.experienceType === "hidden-gem" || 
            a.tags.includes("hidden") ||
            a.type === "iconic"
          )
        : activities;
    
    case "relaxed":
      // Prioritize easy activities
      return activities.filter(a => a.intensity === "easy").length > 0
        ? activities.filter(a => a.intensity === "easy")
        : activities;
    
    case "beach":
      // Prioritize beaches
      return activities.filter(a => 
        a.type === "beach" || getActivityCategory(a).includes("beaches")
      ).length > 0
        ? activities.filter(a => 
            a.type === "beach" || getActivityCategory(a).includes("beaches")
          )
        : activities;
    
    default:
      return activities;
  }
}

// Balance location selection to avoid always picking closest
function balanceLocations(activities: ActivityData[], baseDistance: number, day: number, totalDays: number): ActivityData[] {
  // Divide trip into zones for geographic variety
  const zones = [
    { min: 0, max: 10, label: "near" },      // Huskisson/Vincentia area
    { min: 10, max: 20, label: "mid" },      // Hyams/Greenfield area
    { min: 20, max: 100, label: "far" },     // Booderee/further
  ];
  
  // Assign preferred zone based on day (rotate through zones)
  const preferredZone = zones[day % zones.length];
  
  const zoneActivities = activities.filter(a => {
    const dist = a.distanceFromHuskissonKm || 0;
    return dist >= preferredZone.min && dist < preferredZone.max;
  });
  
  // If not enough in preferred zone, use others
  return zoneActivities.length >= 2 ? zoneActivities : activities;
}

// Avoid repeating categories from previous day
function avoidRepeatedCategories(activities: ActivityData[], prevCategories: string[]): ActivityData[] {
  if (prevCategories.length === 0) return activities;
  
  const nonRepeated = activities.filter(a => {
    const cats = getActivityCategory(a);
    return !cats.some(cat => prevCategories.includes(cat));
  });
  
  // If not enough alternatives, allow repeats
  return nonRepeated.length >= 2 ? nonRepeated : activities;
}

// ==========================================
// MAIN COMPONENT
// ==========================================

const getInitialWizard = (): WizardData => ({
  tripLength: 2,
  customTripLength: null,
  startDate: new Date().toISOString().split('T')[0],
  interests: [],
  travelStyle: "balanced",
  accommodation: "huskisson",
  startTime: "08:00",
  endTime: "18:00",
  dinnerTime: "",
  beachPriority: false,
  beachPriorityDay: 1,
  okWithLongDrives: true,
  completedActivities: [],
});

export default function WeekendItineraryContent() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [wizard, setWizard] = useState<WizardData>(getInitialWizard);

  const itinerary = useMemo(() => {
    if (showResults) {
      return generateItinerary(wizard);
    }
    return [];
  }, [showResults, wizard]);

  const updateWizard = <K extends keyof WizardData>(key: K, value: WizardData[K]) => {
    setWizard((prev) => ({ ...prev, [key]: value }));
  };

  const toggleInterest = (interest: InterestType) => {
    setWizard((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setShowResults(false);
    setWizard(getInitialWizard());
  };

  // ==========================================
  // RENDER STEP CONTENT
  // ==========================================

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Trip Details</h2>
              <p className="text-gray-600">Tell us about your upcoming trip</p>
            </div>
            
            {/* Start Date Input */}
            <div className="max-w-md mx-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">When does your trip start?</label>
              <input
                type="date"
                value={wizard.startDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => updateWizard("startDate", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors text-lg"
              />
              <p className="text-xs text-gray-500 mt-2">
                Your trip starts on {new Date(wizard.startDate).toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-center text-gray-700 font-medium mb-4">How many days?</h3>
              <div className="flex justify-center gap-4 flex-wrap">
                {[1, 2, 3, 4, 5].map((days) => {
                  const isSelected = wizard.tripLength === days;
                  return (
                    <button
                      key={days}
                      onClick={() => updateWizard("tripLength", days)}
                      className={`w-20 h-20 rounded-2xl font-bold text-xl transition-all duration-200 flex items-center justify-center ${
                        isSelected
                          ? "text-white scale-110 shadow-lg"
                          : "bg-white text-gray-700 hover:bg-primary-50 border-2 border-gray-200 hover:border-primary-300"
                      }`}
                      style={isSelected ? {
                        background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-accent-500) 100%)',
                        boxShadow: '0 10px 15px -3px rgba(2, 132, 199, 0.3)',
                      } : undefined}
                    >
                      <span className="text-center">
                        {days}<br/>
                        <span className={`text-xs font-normal ${isSelected ? 'text-white/90' : 'text-gray-500'}`}>day{days > 1 ? "s" : ""}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Custom trip length */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => updateWizard("tripLength", wizard.customTripLength || 6)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  wizard.tripLength > 5
                    ? "text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-primary-50 border-2 border-gray-200 hover:border-primary-300"
                }`}
                style={wizard.tripLength > 5 ? {
                  background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-accent-500) 100%)',
                  boxShadow: '0 10px 15px -3px rgba(2, 132, 199, 0.3)',
                } : undefined}
              >
                Custom
              </button>
              {wizard.tripLength > 5 && (
                <input
                  type="number"
                  min="6"
                  max="14"
                  value={wizard.tripLength}
                  onChange={(e) => updateWizard("tripLength", parseInt(e.target.value) || 6)}
                  className="w-24 px-4 py-2 rounded-xl border-2 border-primary-500 focus:outline-none text-center font-bold text-lg"
                />
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What interests you?</h2>
              <p className="text-gray-600">Select all that apply to personalise your itinerary</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {interests.map((interest) => {
                const isSelected = wizard.interests.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`px-6 py-4 rounded-2xl font-medium transition-all duration-200 ${
                      isSelected
                        ? "text-white shadow-lg scale-105"
                        : "bg-white text-gray-700 hover:bg-primary-50 border-2 border-gray-200 hover:border-primary-300"
                    }`}
                    style={isSelected ? {
                      background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-accent-500) 100%)',
                      boxShadow: '0 10px 15px -3px rgba(2, 132, 199, 0.3)',
                    } : undefined}
                  >
                    <span className="text-2xl block mb-1">{interest.icon}</span>
                    {interest.label}
                  </button>
                );
              })}
            </div>
            
            {wizard.interests.length === 0 && (
              <p className="text-center text-sm text-gray-500">Tip: Select at least one interest for better recommendations</p>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your travel style?</h2>
              <p className="text-gray-600">Choose how packed you want your days to be</p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {travelStyles.map((style) => {
                const isSelected = wizard.travelStyle === style.id;
                return (
                  <button
                    key={style.id}
                    onClick={() => updateWizard("travelStyle", style.id)}
                    className={`p-6 rounded-2xl text-center transition-all duration-200 flex-1 max-w-xs ${
                      isSelected
                        ? "text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-primary-50 border-2 border-gray-200 hover:border-primary-300"
                    }`}
                    style={isSelected ? {
                      background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-accent-500) 100%)',
                      boxShadow: '0 10px 15px -3px rgba(2, 132, 199, 0.3)',
                    } : undefined}
                  >
                    <h3 className="text-xl font-bold mb-2">{style.label}</h3>
                    <p className={`text-sm ${isSelected ? 'text-white/90' : 'text-gray-500'}`}>
                      {style.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Where are you staying?</h2>
              <p className="text-gray-600">We'll prioritise activities near your accommodation</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {accommodations.map((acc) => {
                const isSelected = wizard.accommodation === acc.id;
                return (
                  <button
                    key={acc.id}
                    onClick={() => updateWizard("accommodation", acc.id)}
                    className={`p-4 rounded-xl text-center transition-all duration-200 ${
                      isSelected
                        ? "text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-primary-50 border-2 border-gray-200 hover:border-primary-300"
                    }`}
                    style={isSelected ? {
                      background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-accent-500) 100%)',
                      boxShadow: '0 10px 15px -3px rgba(2, 132, 199, 0.3)',
                    } : undefined}
                  >
                    <span className="text-xl block mb-2">
                      {acc.id === "campervan" ? "🚐" : "🏠"}
                    </span>
                    <span className="font-medium">{acc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Daily Schedule</h2>
              <p className="text-gray-600">Set your preferred start and end times</p>
            </div>
            
            <div className="max-w-md mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                <input
                  type="time"
                  value={wizard.startTime}
                  onChange={(e) => updateWizard("startTime", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                <input
                  type="time"
                  value={wizard.endTime}
                  onChange={(e) => updateWizard("endTime", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dinner / Hard Stop Time <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="time"
                  value={wizard.dinnerTime}
                  onChange={(e) => updateWizard("dinnerTime", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="Not set"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Final Preferences</h2>
              <p className="text-gray-600">A couple more questions to perfect your itinerary</p>
            </div>
            
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Beach Priority */}
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🏖️</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Prioritise a "Best Beach Day"?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Dedicate one day primarily to beach activities for the ultimate beach experience
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => updateWizard("beachPriority", true)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          wizard.beachPriority
                            ? "text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        style={wizard.beachPriority ? {
                          background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-accent-500) 100%)',
                        } : undefined}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => updateWizard("beachPriority", false)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          !wizard.beachPriority
                            ? "text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        style={!wizard.beachPriority ? {
                          background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-accent-500) 100%)',
                        } : undefined}
                      >
                        No
                      </button>
                    </div>
                    
                    {wizard.beachPriority && wizard.tripLength > 1 && (
                      <div className="mt-4">
                        <label className="text-sm text-gray-600 mb-2 block">Which day should be your beach day?</label>
                        <div className="flex flex-wrap gap-2">
                          {Array.from({ length: wizard.tripLength }, (_, i) => i + 1).map((day) => {
                            const isSelected = wizard.beachPriorityDay === day;
                            const weekday = getWeekdayName(wizard.startDate, day - 1);
                            return (
                              <button
                                key={day}
                                onClick={() => updateWizard("beachPriorityDay", day)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                  isSelected
                                    ? "text-white shadow-md"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                                style={isSelected ? {
                                  background: 'linear-gradient(135deg, var(--color-accent-500) 0%, var(--color-primary-500) 100%)',
                                } : undefined}
                              >
                                {weekday}
                              </button>
                            );
                          })}
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                          Not sure which day is best? Check our{" "}
                          <Link
                            href="/best-beaches"
                            target="_blank"
                            className="text-primary-600 hover:text-primary-700 underline font-medium"
                          >
                            Best Beaches guide
                          </Link>{" "}
                          for tips on choosing the perfect beach day based on conditions.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Long Drives */}
              <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🚗</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Okay with longer drive day trips?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Some amazing spots are 1-2 hours away. Include them or stick to nearby areas?
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => updateWizard("okWithLongDrives", true)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          wizard.okWithLongDrives
                            ? "text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        style={wizard.okWithLongDrives ? {
                          background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-accent-500) 100%)',
                        } : undefined}
                      >
                        Yes, include day trips
                      </button>
                      <button
                        onClick={() => updateWizard("okWithLongDrives", false)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          !wizard.okWithLongDrives
                            ? "text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        style={!wizard.okWithLongDrives ? {
                          background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-accent-500) 100%)',
                        } : undefined}
                      >
                        No, keep it local
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ==========================================
  // RENDER RESULTS
  // ==========================================

  if (showResults && itinerary.length > 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary-600 via-accent-600 to-primary-700 text-white py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  Personalised Itinerary
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Your Jervis Bay Trip</h1>
                <p className="text-white/80 text-lg">
                  {wizard.tripLength} day{wizard.tripLength > 1 ? "s" : ""} • {wizard.travelStyle} pace • {wizard.accommodation === "campervan" ? "Flexible location" : accommodations.find(a => a.id === wizard.accommodation)?.label}
                </p>
              </div>
              
              <button
                onClick={resetWizard}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-300"
              >
                Create New Itinerary
              </button>
            </div>
          </div>
        </section>

        {/* Itinerary Content */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            {itinerary.map((dayPlan) => (
              <div key={dayPlan.day} className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Day Header */}
                <div className={`px-6 py-4 ${dayPlan.day === wizard.beachPriorityDay && wizard.beachPriority ? "bg-gradient-to-r from-accent-500 to-primary-500" : "bg-gradient-to-r from-primary-600 to-accent-600"} text-white`}>
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                      {getFormattedDay(wizard.startDate, dayPlan.day - 1)}
                      {dayPlan.day === wizard.beachPriorityDay && wizard.beachPriority && (
                        <span className="ml-3 px-3 py-1 bg-white/30 rounded-full text-sm font-medium">
                          🏖️ Beach Day
                        </span>
                      )}
                    </h2>
                    <span className="text-white/80">
                      {dayPlan.activities.length} activit{dayPlan.activities.length !== 1 ? "ies" : "y"}
                    </span>
                  </div>
                </div>

                {/* Activities */}
                <div className="divide-y divide-gray-100">
                  {dayPlan.activities.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <p>No activities scheduled for this day. Try adjusting your preferences.</p>
                    </div>
                  ) : (
                    dayPlan.activities.map((scheduled, index) => (
                      <div
                        key={`${dayPlan.day}-${index}`}
                        className="p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Time Slot Badge */}
                          <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-1 md:w-32 flex-shrink-0">
                            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                              {formatTimeSlot(scheduled.timeSlot)}
                            </span>
                          </div>

                          {/* Activity Card */}
                          <div className="flex-1">
                            <div className="flex gap-4">
                              {/* Image */}
                              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                                {scheduled.activity.images.length > 0 ? (
                                  <img
                                    src={scheduled.activity.images[0]}
                                    alt={scheduled.activity.title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-3xl">
                                    {scheduled.activity.type === "beach" ? "🏖️" : 
                                     scheduled.activity.type === "walk" || scheduled.activity.type === "hike" ? "🥾" :
                                     scheduled.activity.type === "iconic" ? "⭐" : "📍"}
                                  </div>
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex-1">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                                      {scheduled.activity.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs capitalize">
                                        {scheduled.activity.type}
                                      </span>
                                      {scheduled.activity.costCategory === "free" && (
                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                                          Free
                                        </span>
                                      )}
                                      {scheduled.activity.distanceFromHuskissonKm !== null && (
                                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                                          ~{scheduled.activity.distanceFromHuskissonKm}km from Huskisson
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                                  {scheduled.activity.description}
                                </p>
                                {scheduled.activity.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5 mt-3">
                                    {scheduled.activity.tags.slice(0, 3).map((tag) => (
                                      <span key={tag} className="text-xs text-gray-400">#{tag}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <section className="py-12 px-6 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400 mb-4">
              This itinerary is a suggestion based on your preferences. Feel free to adjust and explore at your own pace!
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // ==========================================
  // RENDER WIZARD
  // ==========================================

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('/Collingwood_Beach_Beautiful_Sunset.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(37, 99, 235, 0.85) 0%,
              rgba(20, 184, 166, 0.8) 50%,
              rgba(6, 182, 212, 0.75) 100%
            )`,
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className="inline-block px-5 py-2 mb-6 text-sm font-semibold tracking-widest uppercase bg-white/15 backdrop-blur-md rounded-full border border-white/25 text-white shadow-lg">
            Trip Planner
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white tracking-tight">
            Weekend Itinerary<br className="hidden md:block" />
            <span className="text-white/90">Planner</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90 font-light leading-relaxed">
            Create a personalised multi-day itinerary for your Jervis Bay adventure. 
            Tell us your preferences and we'll craft the perfect trip for you.
          </p>
        </div>
      </section>

      {/* Wizard Section */}
      <section className="py-12 px-6 -mt-20 relative z-20">
        <div className="max-w-3xl mx-auto">
          {/* Progress Indicator */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
            <div className="flex items-center justify-between mb-8">
              {STEPS.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      currentStep > step.number
                        ? "bg-gradient-to-br from-primary-500 to-accent-500 text-white"
                        : currentStep === step.number
                        ? "bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30 scale-110"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > step.number ? "✓" : step.icon}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`w-8 md:w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                        currentStep > step.number ? "bg-primary-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mb-2">
              <span className="text-sm text-gray-500">Step {currentStep} of {STEPS.length}</span>
              <h2 className="text-lg font-semibold text-gray-900 mt-1">
                {STEPS[currentStep - 1]?.title}
              </h2>
            </div>

            {/* Step Content */}
            <div className="mt-8">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  currentStep === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                ← Back
              </button>
              
              <button
                onClick={nextStep}
                disabled={currentStep === 2 && wizard.interests.length === 0}
                className="px-8 py-3 rounded-xl font-semibold transition-all duration-200 text-white shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-accent-500) 100%)',
                  boxShadow: currentStep === 2 && wizard.interests.length === 0 ? 'none' : '0 10px 15px -3px rgba(2, 132, 199, 0.3)',
                }}
              >
                {currentStep === STEPS.length ? "Generate Itinerary ✨" : "Next →"}
              </button>
            </div>
          </div>

          {/* Help Text */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Take your time — your perfect itinerary awaits! 🌊
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}