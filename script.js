document.addEventListener('DOMContentLoaded', function () {
    const skills = document.querySelectorAll('.skill');
    const projectListSection = document.getElementById('project-list');


    skills.forEach(skill => {
        skill.addEventListener('mouseover', function (event) {
            // Call a function to generate and display the project list
            showProjectList(this.dataset.skill, event.currentTarget);
        });

        skill.addEventListener('mouseout', function (event) {
            if (!isMouseOverElement(event, this) && !isMouseOverElement(event, projectListSection)) {
                hideProjectList();
            }
        });
        });

    // Additional event listener for the project list to keep it visible when hovered
    projectListSection.addEventListener('mouseover', function (event) {
        if (event.target.classList.contains('project-item')){
            event.target.style.color = '#ffcc00'
        }
        //projectListSection.style.display = 'block';
    
    });

    // New event listener to reset the color when the mouse leaves a project item
     projectListSection.addEventListener('mouseout', function (event) {
        if (event.target.classList.contains('project-item')) {
            // Reset the color of the project title
            event.target.style.color = ''; // Reset to the default color or adjust as needed
        }
    });

    // Additional event listener to hide the project list when the mouse leaves it
    projectListSection.addEventListener('mouseout', function (event) {
        // Check if the mouse is not over the project list
        if (!isMouseOverElement(event, projectListSection)) {
            hideProjectList();
        }
    });
});

function showProjectList(skill, button) {
    // Call a function to retrieve projects based on the skill
    const projects = getProjectsBySkill(skill);

    // Display the project list
    const projectList = document.getElementById('projects');
    projectList.innerHTML = '';

    projects.forEach(project => {
        const listItem = document.createElement('li');
        listItem.textContent = project.title;

        // Add a click event listener to redirect to the project summary
        listItem.addEventListener('click', function () {
            // Redirect to the project summary on the portfolio page
            window.location.href = `portfolio.html#${project.id}`;
        });

        projectList.appendChild(listItem);
    });

    const projectListSection = document.getElementById('project-list');
    projectListSection.style.display = 'block';

    // Set the position of the project list to the right of the button
    const buttonRect = button.getBoundingClientRect();
    projectListSection.style.left = `${buttonRect.right}px`;
    projectListSection.style.top = `${buttonRect.top}px`;
}

function hideProjectList() {
    // Hide the project list
    const projectListSection = document.getElementById('project-list');
    projectListSection.style.display = 'none';
}

function getProjectsBySkill(skill) {
    // Implement this function to retrieve projects based on the skill
    // You can use an array or fetch data from a backend/server
    // For demonstration purposes, I'll use a dummy array
    const projects = [
        { id: 'project1', title: 'Stellar Rotators', skills: ['Python', 'Machine Learning'] },
        { id: 'project2', title: 'Exomoon Transits', skills: ['R', 'Skill3'] },
        // Add more projects as needed
    ];

    return projects.filter(project => project.skills.includes(skill));
}

// Helper function to check if the mouse is over a specific element
function isMouseOverElement(event, element) {
    const rect = element.getBoundingClientRect();
    return (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
    );
}
