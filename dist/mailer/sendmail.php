<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

//От кого письмо
$mail->setFrom('info@4webcode.ru', 'Сообщение с сайта');
//Кому отправить
$mail->addAddress('max_work86@mail.ru');
//Тема письма
$mail->Subject = 'Сообщение с сайта';

//Тело письма
$body = '<h1>Вам пришло сообщение:</h1>';

if(trim(!empty($_POST['name']))) {
	$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['phone']))) {
	$body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
}
if(trim(!empty($_POST['email']))) {
	$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['textform']))) {
	$body.='<p><strong>Сообщение:</strong> '.$_POST['comment'].'</p>';
}
if(trim(!empty($_POST['password']))) {
	$body.='<p><strong>Пароль:</strong> '.$_POST['password'].'</p>';
}

//Прикрепить файл
if (!empty($_FILES['image']['tmp_name'])) {
	for ($ct = 0; $ct < count($_FILES['image']['tmp_name']); $ct++) {
		$uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['image']['name'][$ct]));
		$filename = $_FILES['image']['name'][$ct];
		if (move_uploaded_file($_FILES['image']['tmp_name'][$ct], $uploadfile)) {
			$body.='<p><strong>Файл находится во вложении</strong></p>';
			$mail->addAttachment($uploadfile, $filename);
		} else {
			$msg .= 'Failed to move file to ' . $uploadfile;
		}
	}
}

$mail->Body = $body;

//Отправляем
if (!$mail->send()) {
	$message = 'Ошибка';
} else {
	$message = 'Данные отправлены!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>