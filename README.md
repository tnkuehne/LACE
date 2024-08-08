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

### Design decisions
#### Landing Page

##### Title and Header:
The title is concise and action-oriented, clearly conveying the page's purpose. The header features a gradient background and the LACE logo, creating a modern, professional appearance and establishing brand identity. This creates a strong first impression and reinforces the brand's credibility.

##### Courses Section:
Three courses target different user groups: non-technical practitioners, managers, and legal professionals. Each course is presented as a card with a title, short description, and a "Learn More" button, allowing easy scanning and quick access to relevant information. The card layout enhances user experience by facilitating quick scanning and easy interaction.

##### Publications Section:
Scientific publications are listed vertically with icons for easy identification, ensuring a simple and intuitive browsing experience. Listing key scientific publications provides access to credible sources, establishing trust and authority.

##### Footer Section:
The footer includes branding, relevant links, sponsor information, and a copyright notice. The consistent color scheme and fonts ensure a cohesive look. Including branding and sponsor information adds legitimacy and transparency, while relevant links improve navigation and access to additional resources.

#### Courses Overview

##### Course Cards:
All courses are presented as expandable cards with a course image, title, and detailed content outline. This design allows users to quickly identify and expand each course for more detailed information, enhancing the user experience through easy navigation.

##### Navigation:
Breadcrumb navigation is included at the top of the page to help users easily navigate back to the main courses page or other sections of the website. This improves the overall user experience by making navigation intuitive and straightforward.

#### Course Detail Page

##### Consistent Layout:
All courses are displayed using a consistent card-based layout to ensure a uniform look and feel across different courses.

##### Navigation:
Breadcrumb navigation is included at the top of the page to help users easily navigate back to the main courses page or other sections of the website. This improves the overall user experience by making navigation intuitive and straightforward.

##### Adaptability:
The design is adaptable to accommodate different courses. While the basic layout remains consistent, the specific content and number of modules can vary based on the course requirements. This flexibility ensures that the design can cater to a wide range of topics within the realm of Privacy-Enhancing Technologies.

#### Learning Page

##### Sidebar Navigation:
A sidebar displays the course title, progress bar, and module list. This design keeps navigation intuitive and accessible, allowing users to track their progress and easily switch between modules.

##### Progress Tracking:
The progress bar visually represents the user's completion percentage, motivating them to continue and complete the course.

##### Module Expansion:
Modules are presented as expandable sections. When clicked, they reveal detailed content such as definitions, benefits, applications, and quizzes. This keeps the interface clean and prevents information overload.

##### Interactive Elements:
Buttons for "Give Feedback" and "Switch Device" are included to enhance user interaction and flexibility. These options allow users to provide input on the course and switch devices seamlessly.

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