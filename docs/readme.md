# Course replacement implementation notes

This document describes the new single-course structure, API, content layer, and maintenance operations.

## Frontend

- Content layer: `frontend/src/content/copy.ts`, `frontend/src/content/exercises.ts`
  - `courseCopy.frontpage.title`, `courseCopy.endpage.message`
  - `exercisesMeta` lists the new exercises and routes
- API: `frontend/src/App/api/courseService.ts` using `/course` endpoints
- Router: `frontend/src/App/index.tsx`
  - New exercises: `challenge-brief`, `ideation`, `prioritization`
  - Removed: `prologue`, `values`
- Components: see `frontend/src/App/Components/Exercise/`
- Styles: `frontend/src/App/Components/Exercise/exercises.css`

## Shared types

- `shared_types/exercises.ts` exports `CourseExercises` with new fields:
  - `challengeBrief.summary`
  - `ideation.ideas[]`
  - `prioritization.criteria[]`, `prioritization.selected[]`

## Backend

- Model: `backend/src/models/Course.ts`
- Service: `backend/src/services/CourseService.ts`
- Controller: `backend/src/controllers/CourseController.ts`
- DB init: `backend/src/services/database.ts`
- Routes mounted: `/course`

### Admin reset endpoints

- DELETE `/course/admin/reset` (admin only): purge all Course entries
- DELETE `/course/admin/reset-all` (admin only): purge all Course and legacy BookOne entries

## QA checklist (smoke)

- Login, navigate to `/exercise`, verify fetch of course
- Edit Challenge Brief; confirm autosave and reload persists
- Add several ideas in Ideation; reload persists
- Add and select criteria in Prioritization; reload persists
- View page renders read-only for all sections without errors
- Admin reset: call endpoint, data cleared; client re-creates on load

## Content updates

- Update `courseCopy` for titles/texts
- Adjust routes in `exercisesMeta` and `App/index.tsx` as needed

# Canvas

## User
```
{
    id,
    mooc_id,
    courses,
}
```
## Course
```
{
    id,
    name,
    slug,
    contact_person,
    pages
}
```

## Page
```
{
    id,
    (slug?),
    course_id,
    left_widget,
    right_widget
}
```
## Widget
I was thinking if I should either build with schemas or just define every widget in code.
Since we have no plans to support custom widgets (teacher defined), hard coded definitions in code is simpler.
This means, that the widgets are just stored as a jsonb and DB does not know about their structure.
```
{
    id,
    type,
    jsonb
}
```
 Widget can be any of:
### TextBoxExercise
```
{
    question,
    infotext,
    box_size
}
```
### TextMaterial
```
{
    text
}
```
### Image
```
{
    url,
    alt_text,
    description,
    size
}
```


### Chatbot
```
{
    welcome_text,
    prompt
}
```

## Answer
```
{
    id,
    course_id,
    user_id,
    widget_type,
    widget_id,
    answer_blob
}
```
# Risks/Dicussion
## Widget/answer sync
Are widgets too complicated to define? If we just wanted to have simple page layout?
However, with growing expectations from the clients, I think defining widgets makes it more modular.
How to manage widgets?

