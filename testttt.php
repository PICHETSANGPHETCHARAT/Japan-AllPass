<?php
/**
 * Created by PhpStorm.
 * User: jakapong
 * Date: 7/25/2016 AD
 * Time: 4:51 AM
 */


function AddDataMember_V3() {
    $this->output->unset_template('main-default');
    $postdata = json_decode(file_get_contents("php://input"), true);
    if (isset($postdata['API_ID']) && $postdata['API_ID'] == 'KEYADD') {
        if (!empty($postdata['discount'])) {
            $discount = $postdata['discount'];
        } else {
            $discount = '';
        }

        $this->load->model('user/User_model', 'User', TRUE);
        $this->load->model('ticketmanagement/ManagementTicket_model', 'Management', TRUE);

        $query = $this->User->getMailUser_SQL($postdata['profile'][0]['mail'], 'MEMBER');

        if (!empty($query)) {

            $query2 = $this->Management->addBuyTicket_M_SQL($postdata, $discount);

            $MaxID = $this->Management->sumIdBook_M_SQL();
            $idsum = $MaxID;
            $priceSum = 0;
            $i = 0;
            foreach ($postdata['ticket'] as $row) {
                $ii = 0;
                for ($ii; $ii < $row['num']; $ii++) {
                    $sumdis=0;
                    $priceSumDis=0;
                    $idsum = $idsum + 1;
                    $a = $row['dis'];
                    $sumdis  = ($row['price']*$a)/100;

                    if((!empty($postdata['profile'][$i]['photo'])) && $postdata['profile'][$i]['photo'] != ""){
                        $img = $postdata['profile'][$i]['photo'];
                        // $img = str_replace('data:image/jpeg;base64,', '', $img);
                        // $img = str_replace(' ', '+', $img);
                        $dir = $_SERVER['DOCUMENT_ROOT'] . '/assets/photo/';
                        $datafile = base64_decode($img);
                        $filename = uniqid().'.jpg';
                        $fileimage = $dir.$filename;
                        $success = file_put_contents($fileimage, $datafile);
                        $row['photo'] =  $filename;
                        if($success){
                            $priceSumDis= $row['price'] - round($sumdis);
                            $this->Management->addBuyTicket_book_M_SQL($row['id'], 1, $row['price'], $query2['buy_ticket_id'], $query2['buy_ticket_serial'], $idsum, $a, $priceSumDis,round($sumdis)
                                ,$postdata['profile'][$i]['sex'],$postdata['profile'][$i]['namef'],$postdata['profile'][$i]['namel'],$postdata['profile'][0]['mail'],$postdata['profile'][0]['phone'],$filename);

                            $i++;
                            $priceSum = $priceSum+ $priceSumDis;
                        }

                      } else {
                        $priceSumDis= $row['price'] - round($sumdis);
                        $this->Management->addBuyTicket_book_M_SQL($row['id'], 1, $row['price'], $query2['buy_ticket_id'], $query2['buy_ticket_serial'], $idsum, $a, $priceSumDis,round($sumdis)
                            ,$postdata['profile'][$i]['sex'],$postdata['profile'][$i]['namef'],$postdata['profile'][$i]['namel'],$postdata['profile'][0]['mail'],$postdata['profile'][0]['phone']);

                        $i++;
                        $priceSum = $priceSum+ $priceSumDis;
                    }




                }

            }
        } else {


            $randpass = 123456;
            $p= $this->User->addUserMEMBER_M_SQL($postdata['profile'], $randpass);
            $query2 = $this->Management->addBuyTicket_M_SQL($postdata, $discount);
            $MaxID = $this->Management->sumIdBook_M_SQL();
            $idsum = $MaxID;
            $priceSum = 0;
            $i=0;
            foreach ($postdata['ticket'] as $row) {
                $ii = 0;
                for ($ii; $ii < $row['num']; $ii++) {
                    $sumdis=0;
                    $priceSumDis=0;
                    $idsum = $idsum + 1;
                    $a = $row['dis'];
                    $sumdis = ($row['price']*$a)/100;
                    $priceSumDis= $row['price'] - round($sumdis);
//                        $this->Management->addBuyTicket_book_M_SQL($row['id'], 1, $row['price'], $query2['buy_ticket_id'], $query2['buy_ticket_serial'], $idsum, $row['dis'], $priceSumDis, $sumdis);
                    if($postdata['profile'][$i]['photo'] && $postdata['profile'][$i]['photo'] != ""){
                        $img = $postdata['profile'][$i]['photo'];
                        // $img = str_replace('data:image/jpeg;base64,', '', $img);
                        //$img = str_replace(' ', '+', $img);
                        $dir = $_SERVER['DOCUMENT_ROOT'] . '/assets/photo/';
                        $datafile = base64_decode($img);
                        $filename = uniqid().'.jpg';
                        $fileimage = $dir.$filename;
                        $success = file_put_contents($fileimage, $datafile);
                        $row['photo'] =  $filename;
                        if($success){
                            $this->Management->addBuyTicket_book_M_SQL($row['id'], 1, $row['price'], $query2['buy_ticket_id'], $query2['buy_ticket_serial'], $idsum, $a, $priceSumDis, round($sumdis)
                                ,$postdata['profile'][$i]['sex'],$postdata['profile'][$i]['namef'],$postdata['profile'][$i]['namel'],$postdata['profile'][0]['mail'],$postdata['profile'][0]['phone'],$filename);

                            $i++;
                            $priceSum = $priceSum + $priceSumDis;
                        }
                       }else {
                        $this->Management->addBuyTicket_book_M_SQL($row['id'], 1, $row['price'], $query2['buy_ticket_id'], $query2['buy_ticket_serial'], $idsum, $a, $priceSumDis, round($sumdis)
                            ,$postdata['profile'][$i]['sex'],$postdata['profile'][$i]['namef'],$postdata['profile'][$i]['namel'],$postdata['profile'][0]['mail'],$postdata['profile'][0]['phone']);

                        $i++;
                        $priceSum = $priceSum + $priceSumDis;
                    }

                    }

            }

//                $this->sendMail($postdata['profile'][0]['mail'], $randpass);
        }



        if ($query2['buy_ticket_discount_price'] != 0) {
//                $discount_price = ($priceSum * $query2['buy_ticket_discount_price']) / 100;
            $priceSum = $priceSum ;
        }
        if ($query2['buy_ticket_delivery'] == 2) {
            $this->Management->addOfficeBookTicket_M_SQL($postdata, $query2['buy_ticket_serial']);
        }
        $this->Management->updateBookTicket_M_SQL($priceSum, $query2['buy_ticket_serial']);

        switch ($postdata['delivery'][0]['status_pay']) {
            case 1:
                $paytype = 'Pending payment';
                break;
            case 2:
                $paytype = 'Credit Cards';
                break;
            case 3:
                $paytype = 'Linepay';
                break;
        }

        echo $query2['buy_ticket_serial'];

    } else {
        echo "XML";
    }

//        echo "QJP59-01222";
}