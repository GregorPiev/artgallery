<?php

include_once '../mail.php';
if (isset($_POST['start_send'])) {
    $lname = $_POST['lname'];
    $fname = $_POST['fname'];
    $email = $_POST['email'];
    $affiliation = $_POST['affiliation'];
    $phone_number = $_POST['phone_number'];
    $presentation = $_POST['presentation'];
    $abstract_target = $_POST['abstract_target'];
    $abstract_title = $_POST['abstract_title'];
    $author = $_POST['author'];
    $affiliation2 = $_POST['affiliations2'];
    $abstract_body = $_POST['abstract_body'];
    $editor_comments = $_POST['editor_comments'];

    $uploadOk = 2;
    $error_upload = "Server Error:";
    $result = 0;

    if (is_uploaded_file($_FILES['images_abstracted']['tmp_name'])) {
        $target_dir = "../upload/";
        $target_file = $target_dir . basename($_FILES["images_abstracted"]["name"]);
        $uploadOk = 1;
        $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
        $check = getimagesize($_FILES["images_abstracted"]["tmp_name"]);
        if ($check !== false) {
            $uploadOk = 1;
        } else {
            $error_upload .= "\nFile is not an image.";
            $uploadOk = 0;
        }

// Check file size
        if ($_FILES["images_abstracted"]["size"] > 5000000) {
            $error_upload .= "\nSorry, your file is too large.";
            $uploadOk = 0;
        }
// Allow certain file formats
        if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
            $error_upload .= "\nSorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }
// Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            $error_upload .= "\nSorry, your file was not uploaded.";
// if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($_FILES["images_abstracted"]["tmp_name"], $target_file)) {
                // echo "The file " . basename($_FILES["images_abstracted"]["name"]) . " has been uploaded.";
            } else {
                $error_upload .= "\nSorry, there was an error uploading your file.";
                $uploadOk = 0;
            }
        }

        $filename = $target_file;
        $flname = basename($_FILES["images_abstracted"]["name"]);
    }

    $to = "gregpiev@gmail.com";


    $name = $fname . " " . $lname;
    $from_email = $email; //"officey@operad.com";
    $subject = "Contact Us form";

    $message = "<table>";
    $message .= "<tr><td><b>First Name:</b>" . $fname . "</td></tr>";
    $message .= "<tr><td><b>Last Name:</b>" . $lname . "</td></tr>";
    $message .= "<tr><td><b>Institutional affiliation / Professional Affiliations:</b>" . $affiliation . "</td></tr>";
    $message .= "<tr><td><b>Phone number:</b>" . $phone_number . "</td></tr>";
    $message .= "<tr><td><b>Email:</b>" . $email . "</td></tr>";
    $message .= "<tr><td><b>I would like to present:</b>" . $presentation . "</td></tr>";
    if ($abstract_target != '') {
        $message .= "<tr><td><b>I would like to submit an abstract for:</b>" . $abstract_target . "</td></tr>";
    }
    if ($abstract_title != '') {
        $message .= "<tr><td><b>Abstract Title:</b>" . $abstract_title . "</td></tr>";
    }
    if ($author != '') {
        $message .= "<tr><td><b>Author/s:</b>" . $author . "</td></tr>";
    }
    if ($affiliation2 != '') {
        $message .= "<tr><td><b>Institutional affiliations / Professional Affiliations:</b>" . $affiliation2 . "</td></tr>";
    }
    if ($abstract_body != '') {
        $message .= "<tr><td><b>I would like to submit an abstract for:</b>" . $abstract_target . "</td></tr>";
    }
    if ($abstract_target != '') {
        $message .= "<tr><td><b>Abstract Body:</b>" . $abstract_body . "</td></tr>";
    }
    if ($editor_comments != '') {
        $message .= "<tr><td><b>Comments for the editor:</b>" . $editor_comments . "</td></tr>";
    }
    $message .= "</table>";

    if ($uploadOk == 2) {
        //$result = mail::sendMail($to, $name, $email, $subject, $message);
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= 'From: ' . $name . ' <' . $email . '>' . "\r\n";
        $headers .= 'Cc:' . $cc . ' ' . "\r\n";

        $result = mail($to, $subject, $message, $headers);
    } elseif ($uploadOk == 0) {

    } else {
        mail::prepareAttachment($filename);
        $result = mail::sendMail($to, $name, $from_email, $subject, $message, $filename);
    }

    if ($result == 1) {
        ?>
        <script type="text/javascript">
            parent.post_message('Email sent by success');
        </script>
        <?php

    } else {
        ?>
        <script type="text/javascript">
            parent.post_message($error_upload);
        </script>
        <?php

    }
}
?>


