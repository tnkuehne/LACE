# LACE

## Overview

...

## Features

...

## Prerequisites

* Docker
* Docker Compose

## Installation

...

## Usage

...

## Development

### Architecture

#### Database

```mermaid
erDiagram
    Courses {
        text Description 
        uuid Image FK 
        character_varying Title 
        character_varying color 
        character_varying icon 
        uuid id PK 
        character_varying status 
    }

    certificates {
        timestamp_with_time_zone date_created 
        uuid id PK 
        character_varying signature 
    }

    certification {
        timestamp_with_time_zone date_updated 
        character_varying details_form_description 
        character_varying details_form_title 
        uuid id PK 
        uuid user_updated FK 
    }

    course_page {
        timestamp_with_time_zone date_updated 
        uuid id PK 
        character_varying status 
        character_varying title 
        uuid user_updated FK 
    }

    courses_page {
        character_varying Toast_text 
        timestamp_with_time_zone date_updated 
        uuid id PK 
        character_varying status 
        character_varying title 
        uuid user_updated FK 
    }

    folien {
        uuid bild FK 
        timestamp_with_time_zone date_created 
        timestamp_with_time_zone date_updated 
        uuid id PK 
        integer sort 
        character_varying status 
        uuid user_created FK 
        uuid user_updated FK 
    }

    ip2city {
        character_varying city_name 
        character_varying continent_code 
        character_varying country_iso 
        character_varying first_ip 
        bigint first_ip_int 
        uuid id PK 
        character_varying last_ip 
        bigint last_ip_int 
        real latitude 
        real longitude 
        character_varying state_name 
    }

    kapitel {
        character_varying color 
        timestamp_with_time_zone date_created 
        timestamp_with_time_zone date_updated 
        text description 
        uuid id PK 
        uuid kurs FK 
        uuid parent FK 
        integer sort 
        character_varying status 
        character_varying title 
        uuid user_created FK 
        uuid user_updated FK 
    }

    kapitel_content_1 {
        character_varying collection 
        integer id PK 
        character_varying item 
        uuid kapitel_id FK 
        integer sort 
    }

    landing {
        character_varying courses_action_button_text 
        text courses_description 
        character_varying courses_title 
        timestamp_with_time_zone date_updated 
        character_varying description 
        uuid id PK 
        character_varying status 
        character_varying subtitle 
        character_varying title 
        uuid user_updated FK 
    }

    learning_page {
        timestamp_with_time_zone date_updated 
        character_varying final_text 
        character_varying final_title 
        uuid id PK 
        character_varying status 
        uuid user_updated FK 
    }

    mcQuiz {
        json answers 
        timestamp_with_time_zone date_created 
        timestamp_with_time_zone date_updated 
        uuid id PK 
        character_varying question 
        integer sort 
        character_varying status 
        character_varying type 
        uuid user_created FK 
        uuid user_updated FK 
    }

    page_views {
        character_varying browser 
        timestamp_with_time_zone date_created 
        character_varying device 
        uuid id PK 
        character_varying ip 
        geometry location_point 
        character_varying os 
        character_varying path 
        character_varying referrer 
    }

    quiz_data {
        boolean correct 
        timestamp_with_time_zone date_created 
        uuid id PK 
        uuid quiz FK 
        json wrong 
    }

    survey {
        timestamp_with_time_zone date_created 
        timestamp_with_time_zone date_updated 
        character_varying description 
        uuid id PK 
        json questions 
        character_varying status 
        character_varying submit_button 
        character_varying title 
        character_varying trigger_button 
        uuid user_created FK 
        uuid user_updated FK 
    }

    survey_data {
        json answers 
        timestamp_with_time_zone date_created 
        uuid id PK 
    }

    kapitel }o--|| Courses : "kurs"
    kapitel }o--|| kapitel : "parent"
    kapitel_content_1 }o--|| kapitel : "kapitel_id"
    quiz_data }o--|| mcQuiz : "quiz"

```

### Technical Stack

* Frontend: SvelteKit for a fast, modern web experience.
* Backend: Directus as a headless CMS, managing course content, user profiles, and progress tracking.
* Database: SQLite for a simple, portable database.
* Deployment: Docker-compose for easy deployment and scalability. GitHub Actions for continuous integration and deployment workflows.

### Folder Structure

...

### Contributing

...

### License

...