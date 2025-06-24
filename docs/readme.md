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
    desc,
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

