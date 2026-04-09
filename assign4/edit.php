<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
include 'db.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$error = "";

// Handle Update Student
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['update_student'])) {
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $mobile = $conn->real_escape_string($_POST['mobile']);
    $department = $conn->real_escape_string($_POST['department']);

    $sql = "UPDATE student SET name='$name', email='$email', mobile='$mobile', department='$department' WHERE id=$id";
    if ($conn->query($sql) === TRUE) {
        header("Location: index.php?message=Record+updated+successfully");
        exit();
    } else {
        $error = "Error updating record: " . $conn->error;
    }
}

// Fetch student data by ID
$sql = "SELECT * FROM student WHERE id=$id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
} else {
    die("Student not found!");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Student - StudentPortal</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        .edit-container { max-width: 500px; margin: 60px auto; }
        .back-link { display: inline-flex; align-items: center; text-decoration: none; color: var(--text-muted); font-size: 0.875rem; margin-bottom: 20px; transition: color 0.2s; }
        .back-link:hover { color: var(--primary); }
    </style>
</head>
<body>

<nav class="navbar">
    <div class="navbar-brand">StudentPortal</div>
    <div class="nav-links">
        <a href="index.php">Dashboard</a>
        <a href="logout.php" class="logout-btn">Logout</a>
    </div>
</nav>

<div class="container overflow-hidden">
    <div class="edit-container">
        <a href="index.php" class="back-link">← Back to Dashboard</a>
        
        <div class="card">
            <h3 class="card-title">Edit Student Profile</h3>
            
            <?php if ($error): ?>
                <div class="alert alert-error"><?php echo $error; ?></div>
            <?php endif; ?>

            <form method="POST" action="">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" value="<?php echo htmlspecialchars($row['name']); ?>" required>
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" value="<?php echo htmlspecialchars($row['email']); ?>" required>
                </div>
                <div class="form-group">
                    <label>Mobile Number</label>
                    <input type="text" name="mobile" value="<?php echo htmlspecialchars($row['mobile']); ?>" required>
                </div>
                <div class="form-group">
                    <label>Department</label>
                    <select name="department" required>
                        <option value="Computer Science" <?php if($row['department'] == 'Computer Science') echo 'selected'; ?>>Computer Science</option>
                        <option value="Information Technology" <?php if($row['department'] == 'Information Technology') echo 'selected'; ?>>Information Technology</option>
                        <option value="Electronics" <?php if($row['department'] == 'Electronics') echo 'selected'; ?>>Electronics</option>
                        <option value="Mechanical" <?php if($row['department'] == 'Mechanical') echo 'selected'; ?>>Mechanical</option>
                        <option value="Civil" <?php if($row['department'] == 'Civil') echo 'selected'; ?>>Civil</option>
                    </select>
                </div>
                <button type="submit" name="update_student" class="btn-primary">Update Student Info</button>
            </form>
        </div>
    </div>
</div>

</body>
</html>
