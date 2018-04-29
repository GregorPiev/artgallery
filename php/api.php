<?php
require_once './Database.php';
$obj = Database::getConnection();
$data = file_get_contents('php://input');
$json = json_decode($data);

$op = $json->{'op'};
if (isset($op)) {
    switch ($op) {
        case "add":
            $fname = addslashes($json->{'data'}->{'fname'});
            $short = addslashes($json->{'data'}->{'short'});
            $description = addslashes($json->{'data'}->{'description'});
            $email = addslashes($json->{'data'}->{'email'});
            $code = $obj->insertData(['fullname', 'short', 'description', 'email'], [$fname, $short, $description, $email], 'artisans', null);
            $resp = array('code' => $code, 'msg' => $obj->getMsg());
            header('Content-type: application/json');
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET,POST');
            echo json_encode($resp);
            break;
        case 'page';
            $idpage = $json->{'data'}->{'idpage'};
            $table = $json->{'data'}->{'table'};
            $result = $obj->select(['idpage', 'topic', 'content', 'picture'], $table, "WHERE idpage={$idpage}");
//            echo "<pre>Result:";
//            print_r($result);
//            echo "</pre>";
            $resp = array('data' => $result, 'msg' => $obj->getMsg());
            header('Content-type: application/json');
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET,POST');
            echo json_encode($resp);
            break;
        case 'list';
            $idpage = $json->{'data'}->{'id'};
            $idname = $json->{'data'}->{'idname'};
            $table = $json->{'data'}->{'table'};
            if ($idpage == 0) {
                $result = $obj->selectList(['idart', 'fullname', 'short', 'description', 'picture', 'email'], $table, null);
            } else {
                $result = $obj->selectList(['idart', 'fullname', 'short', 'description', 'picture', 'email'], $table, "WHERE {$idname}={$idpage}");
            }
            $resp = array('data' => $result, 'msg' => $obj->getMsg());
            header('Content-type: application/json');
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET,POST');
            echo json_encode($resp);
            break;
        case 'delete':
            $idpage = $json->{'data'}->{'id'};
            $idname = $json->{'data'}->{'fieldname'};
            $table = $json->{'data'}->{'table'};
            $query_conditional = "Where $idname = $idpage";
            $resp = $obj->deleteWithPictures($table, ['picture'], $query_conditional);
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
} else {
    $ret = -999;
    $resp = array('code' => $ret, 'msg' => 'invalid operation');
    //header('Content-type:application/json');
    //header('Access-Control-Allow-Origin: *');
    echo json_encode($resp);
}