# Terminology Replacement Guide
## "Side Effects" → "Adverse Drug Reactions (ADR)"

This is a simple find-and-replace task. Use your code editor's find-and-replace feature.

## Replacement Rules

### Rule 1: Simple Replacements
| **Find** | **Replace With** |
|----------|-----------------|
| side effect | adverse drug reaction |
| Side Effect | Adverse Drug Reaction |
| Side Effects | Adverse Drug Reactions |
| SIDE EFFECT | ADVERSE DRUG REACTION |

### Rule 2: Context-Specific Replacements
| **Original Phrase** | **Replace With** |
|---------------------|-----------------|
| chemotherapy side effects | adverse drug reactions from chemotherapy |
| medication side effects | medication adverse reactions |
| drug side effects | adverse drug reactions |
| reporting side effects | reporting adverse drug reactions |
| monitor side effects | monitor adverse drug reactions |
| common side effects | common adverse drug reactions |

### Rule 3: Abbreviations
After first mention, you can use:
- ADR (singular)
- ADRs (plural)

Example:
"Adverse Drug Reactions (ADRs) cause millions of emergency visits annually. 94% of ADRs go unreported."

---

## Quick VS Code Find-Replace

### Step 1: Open Find-Replace
- Press `Ctrl+H` (Windows/Linux) or `Cmd+H` (Mac)

### Step 2: Search Patterns
Use case-insensitive search and replace these in order:

#### Replace 1:
- **Find:** `side effect`
- **Replace:** `adverse drug reaction`
- **In Files:** All `.tsx` files
- Click "Replace All"

#### Replace 2:
- **Find:** `Side Effect`
- **Replace:** `Adverse Drug Reaction`
- Click "Replace All"

#### Replace 3:
- **Find:** `Side Effects`
- **Replace:** `Adverse Drug Reactions`
- Click "Replace All"

---

## Files Requiring Update (56 matches in 21 files)

✅ `/components/HeroSection.tsx` (1 match)
✅ `/components/FeaturesSection.tsx` (1 match)
✅ `/components/AIChatWidget.tsx` (1 match)
✅ `/components/QuickReportingPage.tsx` (1 match)
✅ `/components/AISeverityPage.tsx` (1 match)
✅ `/components/AboutPage.tsx` (3 matches)
✅ `/components/AIFeaturesPage.tsx` (1 match)
✅ `/components/FullScreenAIChat.tsx` (15 matches)
✅ `/components/PharmaceuticalsOncologyPage.tsx` (6 matches)
✅ `/components/EnhancedHero.tsx` (2 matches)
✅ `/components/HowItWorks.tsx` (1 match)
✅ `/components/DrugStandardizationPage.tsx` (2 matches)
✅ `/components/ResearchKnowledgePage.tsx` (1 match)
✅ `/components/ReportingOverview.tsx` (4 matches)
✅ `/components/DemoLandingPage.tsx` (1 match)
✅ `/components/CompleteDemoLanding.tsx` (2 matches)
✅ `/components/EnhancedRegisterPage.tsx` (1 match)
✅ `/components/PatientDashboard.tsx` (1 match)
✅ `/components/EnhancedQuickReportingPage.tsx` (3 matches)
✅ `/components/DrugDatabase.tsx` (4 matches)
✅ `/components/NewLandingPage.tsx` (1 match)

---

## Before/After Examples

### Example 1: HeroSection.tsx
**Before:**
```tsx
Report, Monitor, and Get AI-Guided Advice on Chemotherapy Side Effects
```

**After:**
```tsx
Report, Monitor, and Get AI-Guided Advice on Chemotherapy Adverse Drug Reactions
```

### Example 2: AboutPage.tsx
**Before:**
```tsx
While these therapies save lives, they also bring challenging side effects that can range from mild discomfort to life-threatening complications.
```

**After:**
```tsx
While these therapies save lives, they also bring challenging adverse drug reactions that can range from mild discomfort to life-threatening complications.
```

### Example 3: FullScreenAIChat.tsx
**Before:**
```tsx
I can help you report side effects, answer questions about medication safety, and provide immediate guidance.
```

**After:**
```tsx
I can help you report adverse drug reactions, answer questions about medication safety, and provide immediate guidance.
```

### Example 4: DrugDatabase.tsx
**Before:**
```tsx
Common Side Effects
```

**After:**
```tsx
Common Adverse Drug Reactions
```

---

## Special Cases to Watch

### 1. AI Chat Messages
When updating `/components/FullScreenAIChat.tsx`, maintain natural language:

**Good:**
- "I understand you're experiencing nausea. This is a common adverse drug reaction..."
- "Here are the ADRs that require immediate medical attention..."

**Also Good (for variety):**
- "adverse reaction"
- "drug reaction"
- "ADR"

### 2. Drug Information
In drug descriptions, you can alternate:
- First mention: "common adverse drug reactions"
- Subsequent mentions: "ADRs"

### 3. Headings
Keep headings concise:
- ✅ "Common ADRs"
- ✅ "Adverse Drug Reactions"
- ❌ "Common Adverse Drug Reactions" (too long for heading)

---

## Verification Checklist

After replacement, verify these key pages:

- [ ] Landing page hero text makes sense
- [ ] AI chat responses read naturally
- [ ] Drug database entries are clear
- [ ] Report forms use correct terminology
- [ ] Patient dashboard text is understandable
- [ ] Clinician dashboard is professional

---

## Professional Terminology Notes

### Why "Adverse Drug Reaction" is Better:

1. **Medical Standard** - Used by WHO, FDA, EMA
2. **Professional** - Understood by regulators and clinicians
3. **Precise** - Specific to drug-induced problems
4. **Regulatory Compliant** - Required for official reporting

### When to Use Each Term:

| **Term** | **When to Use** |
|----------|----------------|
| Adverse Drug Reaction (ADR) | Official reports, medical professionals |
| Adverse Reaction | Shortened version, general use |
| Drug Reaction | Very casual contexts |
| Side Effect | ❌ Avoid (outdated, informal) |

---

## Quick Action Plan

### 5-Minute Fix:
1. Open VS Code
2. Press `Ctrl+H` (or `Cmd+H`)
3. Find: `side effect` (case insensitive)
4. Replace: `adverse drug reaction`
5. Click "Replace All in Files"
6. Review changes
7. Commit!

---

## Done!

Once you've completed this replacement:
- ✅ Platform uses professional medical terminology
- ✅ FDA/WHO compliant language
- ✅ More credible to partners
- ✅ Better for regulatory submissions

**Total time required: 5-10 minutes**

---

*Tip: Always review each replacement to ensure it reads naturally in context. The AI chat should sound conversational while remaining professional.*
