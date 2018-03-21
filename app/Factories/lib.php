<?php 
	if (! function_exists('getimgfromfb')) {
		function getimgfromfb($fbid, $type='large') {
			$url = 'http://graph.facebook.com/v2.4/'.$fbid.'/picture?type='.$type;
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
			$resp = curl_exec($ch);
			curl_close($ch); 
			if(!$resp){
				if ($type == 'large')
					$img = imagecreatefrompng('/home/vntest.info/public_html/lib/avatar200.png');
				else if ($type == 'normal'){
					$img = imagecreatefrompng('/home/vntest.info/public_html/lib/avatar100.png');
				}else if($type == 'square'){
					$img = imagecreatefrompng('/home/vntest.info/public_html/lib/avatar50.png');
				}else{
					$img = imagecreatefrompng('/home/vntest.info/public_html/lib/avatar200.png');
				}
				return $img;
			}
			$img = @imagecreatefromstring($resp);
			return $img;
		}
	
	}
	
	if (! function_exists('getimgfromfb2')) {
		function getimgfromfb2($fbid, $width='100', $height='100') {
			$url = 'http://graph.facebook.com/v2.4/'.$fbid.'/picture?width='.$width.'&height='.$height;
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
			$resp = curl_exec($ch);
			curl_close($ch); 
			if(!$resp){
				if ($type == 'large')
					$img = imagecreatefrompng('/home/hqapps_image_handle/public_html/lib/v2/avatar200.png');
				else if ($type == 'normal'){
					$img = imagecreatefrompng('/home/hqapps_image_handle/public_html/lib/v2/avatar100.png');
				}else if($type == 'square'){
					$img = imagecreatefrompng('/home/hqapps_image_handle/public_html/lib/v2/avatar50.png');
				}else{
					$img = imagecreatefrompng('/home/hqapps_image_handle/public_html/lib/v2/avatar200.png');
				} 
				return $img;
			}
			$img = @imagecreatefromstring($resp);
			return $img;
		}
	}
	if (! function_exists('sortFriendsGender2')) {
		function sortFriendsGender2($gender, $sapxep, $likeTimes, $likeNames, $likeGender,$myId) {
			
					
					if (gettype($sapxep) === NULL) {
						$sapxep = true;
					} else 
						$sapxep = false;
					
					$sortable = array();
					$sortable2 = array();
					$s1 = 0;
					$s2 = 0;
					// var_dump($likeTimes);
					// exit();
					foreach ($likeTimes as $idLike => $___){
						if ($idLike != $myId) {
							if ($gender == $likeGender[$idLike]) {
								array_push($sortable,  array($idLike, $likeTimes[$idLike],$likeNames[$idLike],$likeGender[$idLike]));
								$s1 = $s1 + 1;
							} else {
								array_push($sortable2,  array($idLike, $likeTimes[$idLike],$likeNames[$idLike],$likeGender[$idLike]));
								$s2 = $s2 + 1;
							}
						}
					}
					if ($s1 != 0 && $sapxep == true) {
						usort($sortable, function ($item1, $item2) {
							if ($item1[1] == $item2[1]) return 0;
							return ($item1[1] < $item2[1]) ? 1 : -1;
						});
					}
					if ($s2 != 0) {
						forEach($sortable2 as $i => $___){
							array_push($sortable,$sortable2[$i]);
						}
					}
					return $sortable;
				}
	}


?>