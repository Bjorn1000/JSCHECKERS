<?php
    $temp = $_GET['playerName1'];
    $temp2 = $_GET['playerName2'];
    $date = $_GET['date'];
    $winner = $_GET['winner'];
    $score = $_GET['score'];
    // variables that enable you to access the server and mysql)
	
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "leaderboard";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    // query that links and joins tables together to display info
$query = "INSERT INTO entry (player1, player2, date, winner, score) VALUES(?,?,?,?,?)";

	// prepares the database 
	$stmt = $conn->prepare($query);
	// puts each form variable into the query
	$stmt ->bind_param('ssssi', $temp, $temp2, $date, $winner, $score);
	$stmt->execute();
	// if the query effects nothing then it displays the message
	if($stmt->affected_rows > 0){
		echo "<p> entry inserted into the database. </p>";
	}else{
		echo "<p> An error has occured.<br /> The item was not added.</p>";
	}
// closes server

$count = 0;
$sql = "Select * FROM entry ORDER BY score DESC LIMIT 10";

$result = $conn->query($sql);
// iterates through all the stuff

if ($result->num_rows > 0) {
	
	echo "<table align='center'><tr>";
	echo "<td class='checkerboard'>Place:</td><td class='checkerboard'>Player 1:</td><td class='checkerboard'>Player 2:</td><td class='checkerboard'>Date:</td><td class='checkerboard'>Winner:</td><td class='checkerboard'>Score:</td></tr><tr>";
    while($row = $result->fetch_assoc()) {
		$count++;
		//prints links to the page
		echo "<td class='checkerboard'>".$count."</td>"."<td class='checkerboard'>".$row["player1"]."</td>"."<td class='checkerboard'>".$row["player2"]."</td>"."<td class='checkerboard'>".$row["date"]."</td>"."<td class='checkerboard'>".$row["winner"]."</td>"."<td class='checkerboard'>".$row["score"]."</td>";
			echo "</tr><tr>";
    }
    echo "</tr></table>";
}
else {
    echo "0 results";
}
mysqli_close($conn);

?>