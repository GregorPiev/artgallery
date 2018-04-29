<?php
require_once './Database.php';
$obj = Database::getConnection();
if (isset($_POST)) {
    $op = $_POST['op'];
    switch ($op) {
        case "addResign":
            $fname = addslashes($_POST['fname']);
            $short = addslashes($_POST['short']);
            $description = addslashes($_POST['description']);
            $email = addslashes($_POST['email']);

            if (isset($_FILES['file']) && $_FILES['file']['error'] == 0) {
                $temp = explode(".", $_FILES["file"]["name"]);
                $filename = substr(md5(time()), 0, 10) . '.' . end($temp);
                move_uploaded_file($_FILES['file']['tmp_name'], '../images/coll/' . $filename);
                $code = $obj->insertData(['fullname', 'short', 'description', 'email', 'picture'], [$fname, $short, $description, $email, $filename], 'artisans', null);
            } else {
                $code = $obj->insertData(['fullname', 'short', 'description', 'email', 'picture'], [$fname, $short, $description, $email], 'artisans', null);
            }

            $resp = array('code' => $code, 'msg' => $obj->getMsg());
            header('Content-type: application/json');
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET,POST');
            echo json_encode($resp);
            break;
        default:
            $ret = -999;
            $resp = array('code' => $ret, 'msg' => 'invalid operation');
            echo json_encode($resp);
            break;
    }
}

