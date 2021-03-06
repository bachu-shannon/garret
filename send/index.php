<?php
class Send {
    public function sendMessage() {

        $toemail = "inflash80@gmail.com";

        $message_error = array(
                "message" => "<p>Что-то пошло не так :(</p>",
                "status"  => "error"
        );

        $name  = isset($_POST['name'])  ? strip_tags($_POST['name'])  : "";
        $phone = isset($_POST['phone']) ? strip_tags($_POST['phone']) : "";

        if($name == "" || !preg_match('/^((\+38)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/', $phone)) {
            return json_encode($message_error);
        }

        $message =  "<html><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /><body>" .
                    "<p>Меня зовут: " . $name . "</p>" .
                    "<p>Мой номер:" . $phone . "</p></body></html>";

        $headers  = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
        $headers .= "From: ".$name."\r\n";

        if(mail($toemail, "Заявка", $message, $headers)){
            return json_encode(array(
                "message" => "<h2>Спасибо за ваш запрос</h2> <br> <p>Наши консультанты <br> в ближайшее время свяжутся <br> с вами!</p>",
                "status"  => "success"
            ));
        }
        else{
            return json_encode($message_error);
        }
    }
}

$send = new Send();
print($send->sendMessage());

?>