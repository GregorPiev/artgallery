<?php
include_once '../mail.php';
//print_r($_REQUEST);
if (isset($_POST['start_send'])) {
//Registration form
    if (is_valid() == 1) {
        $title = $_POST['title'];
        $lname = $_POST['lname'];
        $fname = $_POST['fname'];
        $country = $_POST['country'];
        $citizenship = $_POST['citizenship'];
        $pass_number = $_POST['pass_number'];
        $email = $_POST['email'];
        $affiliation = $_POST['affiliation'];
        $address = $_POST['address'];
    } else {
        ?>

        <script type="text/javascript">
        <?php if (empty($_POST['title'])) { ?>
                parent.show_error('title');
        <?php } ?>

        <?php if (empty($_POST['lname'])) { ?>
                parent.show_error('lname');
        <?php } ?>

        <?php if (empty($_POST['fname'])) { ?>
                parent.show_error('fname');
        <?php } ?>

        <?php if (empty($_POST['pass_number'])) { ?>
                parent.show_error('pass_number');
        <?php } ?>

        <?php if (empty($_POST['country'])) { ?>
                parent.show_error('country');
        <?php } ?>

        <?php if (empty($_POST['citizenship'])) { ?>
                parent.show_error('citizenship');
        <?php } ?>

        <?php if (empty($_POST['email'])) { ?>
                parent.show_error('email');
        <?php } ?>

        <?php if (empty($_POST['affiliation'])) { ?>
                parent.show_error('affiliation');
        <?php } ?>

        <?php if (empty($_POST['address'])) { ?>
                parent.show_error('address');
        <?php } ?>


        </script>
        <?php
        die();
    }
    $state = $_POST['state'];

    if (isset($_POST['package'])) {
        $package = $_POST['package'];
    } else {
        $package = '';
    }

    if (isset($_POST['request'])) {
        $request = $_POST['request'];
    } else {
        $request = '';
    }

    if (isset($_POST['rooms'])) {
        $rooms = $_POST['rooms'];
    } else {
        $rooms = '';
    }

    if (isset($_POST['extra_nights'])) {
        $extra_nights = $_POST['extra_nights'];
    } else {
        $extra_nights = '';
    }
    if (isset($_POST['flights'])) {
        $flights = $_POST['flights'];
    } else {
        $flights = '';
    }

    $citizenship_accompanying_person2 = $_POST['citizenship_accompanying_person2'];
    $passport_number = $_POST['passport_number'];
    $country_accompanying_person2 = $_POST['country_accompanying_person2'];
    $daily = implode(',', $_POST['daily']);


    $special_requests = $_POST['special_requests'];
    if (isset($_POST['presentation'])) {
        $presentation = $_POST['presentation'];
    } else {
        $presentation = '';
    }

    if (isset($_POST['payment'])) {
        $payment = $_POST['payment'];
    } else {
        $payment = '';
    }

    $to = "GalitAl@aviation-links.co.il; Nurit.Nevet@aviation-links.co.il ";
    $from_email = $email; //"gregory@operad.com";
    $name = $fname . " " . $lname;
    $subject = "Israeli participant";

    $message = "<table border='1' cellspacing='5' cellpadding='5'>";
    $message .= "<thead><tr><th colspan='2' style='background-color:#369;color:#fff;'>Registration for Israeli participant</th></tr></thead>";

    $message .= "<tr><td><b>Title :</b></td><td>" . $title . "</td></tr>";
    $message .= "<tr><td><b>First Name:</b></td><td>" . $fname . "</td></tr>";
    $message .= "<tr><td><b>Last Name:</b></td><td>" . $lname . "</td></tr>";
    $message .= "<tr><td><b>Passport number:</b></td><td>" . $pass_number . "</td></tr>";

    $message .= "<tr><td><b>Country:</b></td><td>" . $country . "</td></tr>";
    $message .= "<tr><td><b>Citizenship:</b></td><td>" . $citizenship . "</td></tr>";
    $message .= "<tr><td><b>Email :</b></td><td>" . $email . "</td></tr>";
    $message .= "<tr><td><b>Institutional affiliation :</b></td><td>" . $affiliation . "</td></tr>";
    $message .= "<tr><td><b>Institute address :</b></td><td>" . $address . "</td></tr>";



    if ($state != '') {
        $message .= "<tr><td><b>State :</b></td><td>" . $state . "</td></tr>";
    }
    if ($package != '') {
        $message .= "<tr><td><b>Package:</b></td><td>" . $package . "</td></tr>";

        if ($package == 'Full seminar included accommodation') {
            if ($rooms != '') {
                $message .= "<tr><td><b>I would like to be:</b></td><td>" . $rooms . "</td></tr>";
            }

            if ($request != '') {
                $message .= "<tr><td><b>The name of participant for room sharing:</b></td><td>" . $request . "</td></tr>";
            }

            if ($citizenship_accompanying_person2 != '') {
                $message .= "<tr><td><b>Citizenship:</b></td><td>" . $citizenship_accompanying_person2 . "</td></tr>";
            }

            if ($passport_number != '') {
                $message .= "<tr><td><b>Passport number:</b></td><td>" . $passport_number . "</td></tr>";
            }

            if ($country_accompanying_person2 != '') {
                $message .= "<tr><td><b>Country:</b></td><td>" . $country_accompanying_person2 . "</td></tr>";
            }
        }

        if ($package == 'Partial Package') {
            if ($rooms != '') {
                $message .= "<tr><td><b>I would like to be:</b></td><td>" . $rooms . "</td></tr>";
            }

            if ($request != '') {
                $message .= "<tr><td><b>The name of participant for room sharing:</b></td><td>" . $request . "</td></tr>";
            }

            if ($citizenship_accompanying_person2 != '') {
                $message .= "<tr><td><b>Citizenship:</b></td><td>" . $citizenship_accompanying_person2 . "</td></tr>";
            }

            if ($passport_number != '') {
                $message .= "<tr><td><b>Passport number:</b></td><td>" . $passport_number . "</td></tr>";
            }

            if ($country_accompanying_person2 != '') {
                $message .= "<tr><td><b>Country:</b></td><td>" . $country_accompanying_person2 . "</td></tr>";
            }
        }

        if ($package == 'Daily Conference participation') {
            if ($daily != '') {
                $message .= "<tr><td colspan='2'>" . $daily . "</td></tr>";
            }
        }
    }



    if ($extra_nights != '') {
        $message .= "<tr><td  colspan='2'><b>" . $extra_nights . "</b></td></tr>";
    }
    if ($flights != '') {
        $message .= "<tr><td  colspan='2'><b>" . $flights . "</b></td></tr>";
    }
    if ($special_requests != '') {
        $message .= "<tr><td><b>Special requests:</b></td><td>" . $special_requests . "</td></tr>";
    }

    if ($presentation != '') {
        $message .= "<tr><td><b>I would like to present:</b></td><td>" . $presentation . "</td></tr>";
    }
    if ($payment != '') {
        $message .= "<tr><td><b>Payment Method:</b></td><td>" . $payment . "</td></tr>";
    }
    $message .= "</table>";



    if ($payment == 'Credit card') {
        //Payment form
        if (is_valid_card() == 1) {
            $surname_pay = $_POST['surname_pay'];
            $first_name_pay = $_POST['first_name_pay'];
            $passport_number_pay = $_POST['passport_number_pay'];
            $passport_date_expiry_pay = $_POST['passport_date_expiry_pay'];
            $street_name_number_pay = $_POST['street_name_number_pay'];
            $city_pay = $_POST['city_pay'];
            $country_pay = $_POST['country_pay'];
            $zip_code_pay = $_POST['zip_code_pay'];
            $card_pay = $_POST['card_pay'];
            $expiry_date_pay = $_POST['expiry_date_pay'];
            $cvv_pay = $_POST['cvv_pay'];
            $total_amount_pay = $_POST['total_amount_pay'];

            $date_pay = $_POST['date_pay'];
            $state_pay = $_POST['state_pay'];
            $travel_services_pay = $_POST['travel_services_pay'];
        } else {
            ?>

            <script type="text/javascript">
            <?php if (empty($_POST['surname_pay'])) { ?>
                    parent.show_error('surname_pay');
            <?php } ?>

            <?php if (empty($_POST['first_name_pay'])) { ?>
                    parent.show_error('first_name_pay');
            <?php } ?>

            <?php if (empty($_POST['passport_number_pay'])) { ?>
                    parent.show_error('passport_number_pay');
            <?php } ?>

            <?php if (empty($_POST['passport_date_expiry_pay'])) { ?>
                    parent.show_error('passport_date_expiry_pay');
            <?php } ?>

            <?php if (empty($_POST['street_name_number_pay'])) { ?>
                    parent.show_error('street_name_number_pay');
            <?php } ?>

            <?php if (empty($_POST['city_pay'])) { ?>
                    parent.show_error('city_pay');
            <?php } ?>

            <?php if (empty($_POST['country_pay'])) { ?>
                    parent.show_error('country_pay');
            <?php } ?>

            <?php if (empty($_POST['state_pay'])) { ?>
                    parent.show_error('state_pay');
            <?php } ?>

            <?php if (empty($_POST['zip_code_pay'])) { ?>
                    parent.show_error('zip_code_pay');
            <?php } ?>

            <?php if (empty($_POST['card_pay'])) { ?>
                    parent.show_error('card_pay');
            <?php } ?>

            <?php if (empty($_POST['expiry_date_pay'])) { ?>
                    parent.show_error('expiry_date_pay');
            <?php } ?>

            <?php if (empty($_POST['cvv_pay'])) { ?>
                    parent.show_error('cvv_pay');
            <?php } ?>

            <?php if (empty($_POST['total_amount_pay'])) { ?>
                    parent.show_error('total_amount_pay');
            <?php } ?>

            </script>
            <?php
            die();
        }



        //$to_pay = "galital@aviation-links.co.il";
        $to_pay = "GalitAl@aviation-links.co.il; Nurit.Nevet@aviation-links.co.il";

        $name_pay = $first_name_pay . " " . $surname_pay;
        $subject_pay = "Israeli participant. Card Payment";

        $message_pay = "<table border='1' cellspacing='5' cellpadding='5'>";
        $message_pay .= "<thead><tr><th colspan='2' style='background-color:#369;color:#fff;'>Registration for Israeli participant. Card Payment</th></tr></thead>";
        $message_pay .= "<tr><td colspan='2'><b>Docket (Registers by Aviation-links)<br>The Batsheva de Rothschild seminar</b></td></tr>";
        if ($date_pay != '') {
            $message_pay .= "<tr><td><b>Date:</b></td><td>" . $date_pay . "</td></tr>";
        }

        $message_pay .= "<tr><td colspan='2'><b><u>International Credit Card Payment approval</u></b></td></tr>";

        $message_pay .= "<tr><td><b>Surname:</b></td><td>" . $surname_pay . "</td></tr>";
        $message_pay .= "<tr><td><b>First Name:</b></td><td>" . $first_name_pay . "</td></tr>";
        $message_pay .= "<tr><td><b>Passport number:</b></td><td>" . $passport_number_pay . "</td></tr>";
        $message_pay .= "<tr><td><b>Passport date of expiry:</b></td><td>" . $passport_date_expiry_pay . "</td></tr>";
        $message_pay .= "<tr><td><b>Street Name & Number:</b></td><td>" . $street_name_number_pay . "</td></tr>";
        $message_pay .= "<tr><td><b>City:</b></td><td>" . $city_pay . "</td></tr>";
        $message_pay .= "<tr><td><b>State / Province:</b></td><td>" . $state_pay . "</td></tr>";
        $message_pay .= "<tr><td><b>Country:</b></td><td>" . $country_pay . "</td></tr>";
        $message_pay .= "<tr><td><b>Zip Code:</b></td><td>" . $zip_code_pay . "</td></tr>";

        $message_pay .= "<tr><td colspan='2'><b><u>The owner of Credit card</u></b></td></tr>";
        $message_pay .= "<tr><td><b>Card:</b></td><td>" . $card_pay . "</td></tr>";
        $message_pay .= "<tr><td><b>Expiry Date:</b></td><td>" . $expiry_date_pay . "</td></tr>";
        $message_pay .= "<tr><td><b>CVV code:</b></td><td>" . $cvv_pay . "</td></tr>";

        if ($travel_services_pay != '') {
            $message_pay .= "<tr><td colspan='2'><b><u>Approve the charge of my credit card as payment for the following travel services:</u></b></td></tr>";
            $message_pay .= "<tr><td colspan='2'>" . $travel_services_pay . "</td></tr>";
        }
        $message_pay .= "<tr><td><b>Total Amount:</b></td><td>" . $total_amount_pay . "</td></tr>";
        $message_pay .= "</table>";

        $result_pay = mail::sendMail($to_pay, $name_pay, $from_email, $subject_pay, $message_pay);
        if ($result_pay == 1) {
            ?>
            <script type="text/javascript">
                parent.post_message('Email for Payment sent by success');
            </script>
            <?php
        } else {
            ?>
            <script type="text/javascript">
                parent.post_message('Error by send email for Payment');
            </script>
            <?php
        }
    }

    $result = mail::sendMail($to, $name, $from_email, $subject, $message);
    if ($result == 1) {
        ?>
        <script type="text/javascript">
            parent.post_message('Email for Registration sent by success');
        </script>
        <?php
    } else {
        ?>
        <script type="text/javascript">
            parent.post_message('Error by send email for Registration');
        </script>
        <?php
    }
}
?>
<?php

function is_valid() {
    if (empty($_POST['title']) || empty($_POST['lname']) || empty($_POST['fname']) || empty($_POST['country']) || empty($_POST['pass_number']) || empty($_POST['citizenship']) || empty($_POST['email']) || empty($_POST['affiliation']) || empty($_POST['address'])) {
        return 0;
    } else {
        return 1;
    }
}

function is_valid_card() {
    if (empty($_POST['surname_pay']) || empty($_POST['first_name_pay']) || empty($_POST['passport_number_pay']) || empty($_POST['passport_date_expiry_pay']) || empty($_POST['street_name_number_pay']) || empty($_POST['city_pay']) || empty($_POST['country_pay']) || empty($_POST['state_pay']) || empty($_POST['zip_code_pay']) || empty($_POST['card_pay']) || empty($_POST['expiry_date_pay']) || empty($_POST['card_pay']) || empty($_POST['cvv_pay']) || empty($_POST['total_amount_pay'])) {
        return 0;
    } else {
        return 1;
    }
}
?>

