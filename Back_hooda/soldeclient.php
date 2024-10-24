<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'Connect.php';
mysqli_query($connect, "SET NAMES 'utf8'");
$arr = array();


$client = $_REQUEST['id'];
$datedebut = $_REQUEST['dateDebut'];
$datefin = $_REQUEST['dateFin'];
$date = date("Y-m-d");



		$rs2 = mysqli_query($connect,"SELECT ifnull(sum(Montant_initial),0) as credit FROM `soldeinitial` where client_id='$client'");
	while($obj2 = mysqli_fetch_object($rs2)) {
		$credit = $obj2->credit;
	}  
	
	
	
	$rs2 = mysqli_query($connect,"select ('$credit')+(select ifnull(sum(montantTotal),0) from facture f where f.client_id='$client' )- (select ifnull(sum(p.montant),0) as tot from piece_reglement p , reglement r where r.client_id='$client' and p.id_reglement=r.id ) as solde");
	
	while($obj2 = mysqli_fetch_object($rs2)) {
		$soldeactuel = $obj2->solde;
	} 
	
	$rs2 = mysqli_query($connect,"select ('$credit')+(select ifnull(sum(total),0) from factureclients f where f.client_id='$client'  )-(select ifnull(sum(total),0) from factureclremises f where f.client_id='$client')-(select ifnull(sum(total),0) from factureavoircls f where f.client_id='$client')- (select ifnull(sum(p.montant),0) as tot from piecereglementclients p , reglclients r where r.client_id='$client' and p.reglclient_id=r.id  ) as solde");
	while($obj2 = mysqli_fetch_object($rs2)) {
		$soldeactuelparperiode = $obj2->solde;
	} 
	//$soldeprecedent = $credit + $totalttc - $Montant_Regler;
	$soldeprecedent = $credit + $totalttc - $Montant_Regler;
	//$soldeactuel= $soldeprecedent+$ttcdernierfact - $montantdernierfact;
	
	$arr['solde']=array(
	'credit'=>$credit,
	'soldeactuel'=>$soldeactuel,
	'soldeperiode'=>$soldeactuelparperiode,
	'soldeprecedent'=>$soldeprecedent,

	);
	
	if($datedebut!=''){
	
	
		
	$query23="select * from(select f.date,f.id,0 as modepaie_id , f.montantTotal as montant,'' as echance,'' as mode , f.id as factureclient_id , CONCAT(' Facture num ',numero) as type, 'facture' as type_op from facture f where f.client_id='$client' and date>='$datedebut' and date<='$datefin' union select r.date,r.id , p.type_pay as modepaie_id , p.montant as Montant,'' as echance,m.mode,0 as factureclient_id , 'Reglement' as type,'reglement' as type_op from reglement r , piece_reglement p , modepaiements m where r.client_id='$client' and r.id=p.id_reglement and m.id=p.type_pay and r.date>='$datedebut' and r.date<='$datefin' ) as res order by res.date , res.mode";
 
 
 $req = mysqli_query($connect,$query23);
 
	
	while($obj = mysqli_fetch_object($req)){
	$arr['facture_ang'][]=$obj;
		
	}
	
	
	}else{
	
	$query23="select * from(select f.date,f.id,0 as modepaie_id , f.montantTotal as montant,'' as echance,'' as mode , f.id as factureclient_id , CONCAT('Facture num ',numero) as type, 'facture' as type_op from facture f where f.client_id='$client'  union select r.date,r.id , p.type_pay as modepaie_id , p.montant as Montant,'' as echance,m.mode,0 as factureclient_id , 'Reglement' as type,'reglement' as type_op from reglement r , piece_reglement p , modepaiements m where r.client_id='$client' and r.id=p.id_reglement and m.id=p.type_pay  ) as res order by res.date , res.mode";
 
 $req = mysqli_query($connect,$query23);
 	
	while($obj = mysqli_fetch_object($req)){
	$arr['facture_ang'][]=$obj;
		
	}
	
	
		
		}
	
	 
 $req3 = mysqli_query($connect,"select * from clients where id='$client'");
 
	
	while($obj = mysqli_fetch_object($req3)){
	$arr['client']=$obj;
		
	}

echo  json_encode($arr);

?>