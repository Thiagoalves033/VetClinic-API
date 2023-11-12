# VetClinic API

## Overview 

VetClinic API is designed to help a franchise of veterinary clinics manage their clients and attendances in an easier way.

## Items

Tutors and pets are simply items. Their properties are as follows:

— **Tutors:**

|Field|Description|
|-----|-----------|
|id|The tutor's unique id.|
|name|The name of the tutor.|
|phone|The tutor's phone number.|
|email|The tutor's email.|
|date_of_birth|The tutor's birthday.|
|zipCode|The tutor's postal code.|
|pets|A list of pets under the tutor.|

— **Pets:**

|Field|Description|
|-----|-----------|
|id|The pet's unique id.|
|name|The name of the pet.|
|species|The pet's species.|
|carry|?????|
|weight|The pet's weight.|
|date_of_birth|Pet's birthday.|

## Search

The data can also be accessed through the use of specific queries. This section will cover how to use this functionality to request data from the API.

— **Sorting:**

By default, the data is sorted by the tutor's name, but this can be changed using the _sort_ query.

For example, in order to sort the data by date_of_birth: localhost:5000/tutors?sort=date_of_birth

— **Filtering:**

Currently, filtering supports the following parameters: 

|Parameter|Description|
|-----|-----------|
|name=|Filters the data by tutor's name.|
|date_of_birth=|Filters the data by tutor's birthday.|
|fields=|Only the specified fields will be shown. All tutor's properties are allowed.|
|page=|Specify the desired page.|
|limit=|Specify how many items are shown per page. By default, the value is 5.|

**_Important:_** Please, be aware that filtering by pet's properties is still not supported and will result in unexpected behavior.

## Running Locally

In order to run the API locally, follow these steps:

1) Clone this repository
2) Compile the TypesCript source code
3) Run app.js

By default, the application will run on port 5000.
