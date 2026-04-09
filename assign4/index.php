<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
include 'db.php';

$message = "";
$error = "";

// Handle Add Student
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['add_student'])) {
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $mobile = $conn->real_escape_string($_POST['mobile']);
    $department = $conn->real_escape_string($_POST['department']);

    $sql = "INSERT INTO student (name, email, mobile, department) VALUES ('$name', '$email', '$mobile', '$department')";
    if ($conn->query($sql) === TRUE) {
        $message = "Student record added successfully.";
    } else {
        $error = "Error: " . $conn->error;
    }
}

// Fetch all students
$sql = "SELECT * FROM student ORDER BY id DESC";
$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Student Management</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>

<nav class="navbar">
    <div class="navbar-brand">StudentPortal</div>
    <div class="nav-links">
        <span>Welcome, <strong><?php echo htmlspecialchars($_SESSION['username']); ?></strong></span>
        <a href="logout.php" class="logout-btn">Logout</a>
    </div>
</nav>

<div class="container">
    <?php if ($message): ?>
        <div class="alert alert-success"><?php echo $message; ?></div>
    <?php endif; ?>
    
    <?php if ($error): ?>
        <div class="alert alert-error"><?php echo $error; ?></div>
    <?php endif; ?>

    <div class="dashboard-grid">
        <!-- Add Student Form -->
        <div class="card">
            <h3 class="card-title">Add New Student</h3>
            <form method="POST" action="">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" placeholder="John Doe" required>
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" placeholder="john@example.com" required>
                </div>
                <div class="form-group">
                    <label>Mobile Number</label>
                    <input type="text" name="mobile" placeholder="+91 9876543210" required>
                </div>
                <div class="form-group">
                    <label>Department</label>
                    <select name="department" required>
                        <option value="">Select Department</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Civil">Civil</option>
                    </select>
                </div>
                <button type="submit" name="add_student" class="btn-primary">Save Student</button>
            </form>
        </div>

        <!-- Student Records Table -->
        <div class="card">
            <h3 class="card-title">Student Directory</h3>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Student Name</th>
                            <th>Contact Info</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) {
                                echo "<tr>
                                        <td>#" . $row["id"] . "</td>
                                        <td><strong>" . htmlspecialchars($row["name"]) . "</strong></td>
                                        <td>
                                            <div style='font-size: 0.8rem; color: #64748b;'>" . htmlspecialchars($row["email"]) . "</div>
                                            <div style='font-size: 0.8rem; color: #64748b;'>" . htmlspecialchars($row["mobile"]) . "</div>
                                        </td>
                                        <td><span style='background: #e0e7ff; color: #4338ca; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem;'>" . htmlspecialchars($row["department"]) . "</span></td>
                                        <td class='action-links'>
                                            <a href='edit.php?id=" . $row["id"] . "' class='edit-link'>Edit</a>
                                            <a href='delete.php?id=" . $row["id"] . "' class='delete-link' onclick='return confirm(\"Permanently delete this record?\")'>Delete</a>
                                        </td>
                                      </tr>";
                            }
                        } else {
                            echo "<tr><td colspan='5' style='text-align:center; padding: 3rem; color: #94a3b8;'>No student records found</td></tr>";
                        }
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

</body>
</html>
