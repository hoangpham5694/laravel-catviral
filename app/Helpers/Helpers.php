<?php
	//echo "helper";
	if (! function_exists('is_mobile')) {
		function is_mobile() {
			if(isset($_SERVER["HTTP_X_WAP_PROFILE"]))
				return true;
			if(preg_match('/wap.|.wap/i',$_SERVER["HTTP_ACCEPT"]))
				return true;

			if(isset($_SERVER["HTTP_USER_AGENT"])) {
				$user_agents = array(
				'midp', 'java', 'opera mini', 'opera mobi', 'mobi', 'nokia',
				'midp', 'midp', 'j2me', 'avantg', 'docomo', 'novarra', 'palmos',
				'palmsource', '240x320', 'opwv', 'chtml', 'pda', 'windows ce',
				'mmp\/', 'blackberry', 'mib\/', 'symbian', 'wireless', 'nokia',
				'hand', 'mobi', 'phone', 'cdm', 'up.b', 'audio', 'SIE-', 'SEC-',
				'samsung', 'HTC', 'mot-', 'mitsu', 'sagem', 'sony', 'alcatel',
				'lg', 'erics', 'vx', 'NEC', 'philips', 'mmm', 'xx', 'panasonic',
				'sharp', 'wap', 'sch', 'rover', 'pocket', 'benq', 'java', 'pt',
				'pg', 'vox', 'amoi', 'bird', 'compal', 'kg', 'voda', 'sany',
				'kdd', 'dbt', 'sendo', 'sgh', 'jb', 'dddi', 'iphone', 'ipad',
				'android', 'Android','series 60', 's60'
			);
			$user_agents  = implode('|', $user_agents );
			if (preg_match("/$user_agents/i", $_SERVER["HTTP_USER_AGENT"]))
				return true;
			}
			return false;

		}
	}
	if (! function_exists('getenvconf')) {

		function getenvconf($key, $default = '')
		{
			
			$get = env('CONF_'.$key);
		//	$get = env('DB_DATABASE');
			// dd(env('DB_DATABASE'));
			// echo "get env, get".$get; 
			if(empty($get)){
				return $default;
			}

			return $get;
		}
	}
	
?>