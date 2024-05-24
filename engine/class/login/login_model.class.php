<?php
namespace login;

use dibi;
use user\user_model;

class login_model{
    
  private static function log_user($id){
    $_SESSION['user_id'] = $id;
  }

  private static function set_user_name($name, $surname){
    $_SESSION['user_name']  = $surname . ' ' . $name;
  }
  
  private static function set_user_role_id($user_role){
    $_SESSION['user_role_id']  = $user_role;
  }
  
  public static function is_user_logged(){
    return isset($_SESSION['user_id']) ? true : false;
  }
  public function verify_user_login($login, $pass){
    $sql = dibi::select('u.id')->as('user_id')->select('u.name, u.surname')
    ->from('user u')
    ->where('login = %s', $login)->where('pswd = %s', $pass)->where('active = %i', 1); // add checking for is active user
    $user_rec = $sql->fetch();
    if($user_rec){
        self::log_user($user_rec['user_id']);
        self::set_user_name($user_rec['name'], $user_rec['surname']);
        
        $user_role = user_model::get_user_role($user_rec['user_id']);
        if($user_role) {
            self::set_user_role_id($user_role);
        }
        
      return true;
    }else{
      return false;
    }
  }

  public static function logout(){
    $lang = $_SESSION['lang'];
    session_destroy();
    $_SESSION['lang'] = $lang;
    header('Location: ' . SYSTEM_HOST . '/login.php');
    exit;
  }
}
//Created for the GSA in 2020-2021. Project management: SpaceTec Partners, software development: www.foxcom.eu
?>
