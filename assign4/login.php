<?php
session_start();
if (isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit();
}
include 'db.php';

$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $conn->real_escape_string($_POST['username']);
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE username='$username' OR email='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['username'] = $row['username'];
            header("Location: index.php");
            exit();
        } else {
            $error = "Invalid password!";
        }
    } else {
        $error = "User not found!";
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Login - Student Management</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f9; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .auth-container { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); width: 100%; max-width: 400px; }
        h2 { text-align: center; color: #333; margin-bottom: 25px; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; color: #666; font-size: 14px; }
        input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box; font-size: 16px; outline: none; transition: border-color 0.2s; }
        input:focus { border-color: #4A90E2; }
        button { width: 100%; padding: 12px; background-color: #4A90E2; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background-color 0.2s; margin-top: 10px; }
        button:hover { background-color: #357ABD; }
        .footer { text-align: center; margin-top: 25px; color: #777; font-size: 14px; }
        .footer a { color: #4A90E2; text-decoration: none; font-weight: 600; }
        .error-message { background-color: #fee2e2; color: #dc2626; border: 1px solid #fecaca; padding: 10px; border-radius: 6px; margin-bottom: 20px; font-size: 14px; text-align: center; }
    </style>
</head>
<body>

<div class="auth-container">
    <h2>Welcome Back</h2>
    
    <?php if ($error): ?>
        <div class="error-message"><?php echo $error; ?></div>
    <?php endif; ?>

    <form method="POST">
        <div class="form-group">
            <label>Username or Email</label>
            <input type="text" name="username" required placeholder="example@domain.com">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" required placeholder="••••••••">
        </div>
        <button type="submit">Log In</button>
    </form>

    <div class="footer">
        Don't have an account? <a href="register.php">Sign Up</a>
    </div>
</div>

</body>
</html>
