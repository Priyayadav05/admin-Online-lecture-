document.addEventListener('DOMContentLoaded', function () {
    // Fetch and display instructors
    fetch('/instructors')
        .then(response => response.json())
        .then(data => {
            const instructorsList = document.getElementById('instructors');
            data.instructors.forEach(instructor => {
                const listItem = document.createElement('li');
                listItem.textContent = instructor.name;
                instructorsList.appendChild(listItem);
            });
        });

    // Fetch and display courses
    fetch('/courses')
        .then(response => response.json())
        .then(data => {
            const coursesList = document.getElementById('courses');
            data.courses.forEach(course => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${course.name}</strong> (${course.level})<br>${course.description}<br>`;
                if (course.image) {
                    listItem.innerHTML += `<img src="${course.image}" alt="${course.name}" style="max-width: 100%;">`;
                }
                coursesList.appendChild(listItem);
            });
        });
});

function addCourse() {
    const name = document.getElementById('name').value;
    const level = document.getElementById('level').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;

    fetch('/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            level: level,
            description: description,
            image: image,
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        // Reload the courses list
        location.reload();
    });
}