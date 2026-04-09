<?php
session_start();
if (isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit();
}
include 'db.php';

$error = "";
$success = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $conn->real_escape_string($_POST['username']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    if ($password !== $confirm_password) {
        $error = "Passwords do not match!";
    } else {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$hashed_password')";

        if ($conn->query($sql) === TRUE) {
            $success = "Registration successful! You can now <a href='login.php'>Login</a>";
        } else {
            if ($conn->errno == 1062) {
                $error = "Username or Email already exists!";
            } else {
                $error = "Registration failed: " . $conn->error;
            }
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Register - Student Management</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f9; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .auth-container { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); width: 100%; max-width: 400px; }
        h2 { text-align: center; color: #333; margin-bottom: 25px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; color: #666; font-size: 14px; }
        input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box; font-size: 16px; outline: none; transition: border-color 0.2s; }
        input:focus { border-color: #4A90E2; }
        button { width: 100%; padding: 12px; background-color: #4A90E2; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background-color 0.2s; margin-top: 10px; }
        button:hover { background-color: #357ABD; }
        .footer { text-align: center; margin-top: 20px; color: #777; font-size: 14px; }
        .footer a { color: #4A90E2; text-decoration: none; font-weight: 600; }
        .message { padding: 10px; border-radius: 6px; margin-bottom: 20px; font-size: 14px; text-align: center; }
        .error { background-color: #fee2e2; color: #dc2626; border: 1px solid #fecaca; }
        .success { background-color: #dcfce7; color: #16a34a; border: 1px solid #bbf7d0; }
    </style>
</head>
<body>

<div class="auth-container">
    <h2>Create Account</h2>
    
    <?php if ($error): ?>
        <div class="message error"><?php echo $error; ?></div>
    <?php endif; ?>

    <?php if ($success): ?>
        <div class="message success"><?php echo $success; ?></div>
    <?php endif; ?>

    <form method="POST">
        <div class="form-group">
            <label>Username</label>
            <input type="text" name="username" required placeholder="Enter username">
        </div>
        <div class="form-group">
            <label>Email Address</label>
            <input type="email" name="email" required placeholder="Enter email">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" required placeholder="Create password">
        </div>
        <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirm_password" required placeholder="Confirm password">
        </div>
        <button type="submit">Register</button>
    </form>

    <div class="footer">
        Already have an account? <a href="login.php">Log In</a>
    </div>
</div>

</body>
</html>
