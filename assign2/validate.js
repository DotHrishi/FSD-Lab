function submitt() {

    const username = document.getElementById('name');
    const email = document.getElementById('email');
    const course = document.getElementById('course');
    const age = document.getElementById('age');
    let count = 4;
    if (username.value.trim() === '') {
        alert('Name is required.');
        count-=1;
        return false;
    }

    if (email.value.trim() === '') {
        alert('Email is required.');
        count-=1;
        return false;
    }

    if (course.value === '') {
        alert('Please select a course.');
        count-=1;
        return false;
    }

    if (age.value.trim() === '' || isNaN(age.value) || age.value < 16 ) {
        alert('Please enter a valid age (16+).');
        count-=1;
        return false;
    }

    if(count===4){
        alert('Form submitted successfully!');
    }
    return true;
}
