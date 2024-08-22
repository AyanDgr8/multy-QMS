<!-- src/components/routes/monitertest.php -->

<?php

$servername = "localhost";
$username = "root";
$password = "Ayan@1012";
$dbname = "mycode";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submission for comments
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['transcription_id'], $_POST['comment'])) {
    $transcription_id = $conn->real_escape_string($_POST['transcription_id']);
    $comment = $conn->real_escape_string($_POST['comment']);

    $sql = "UPDATE transcriptions SET comment='$comment' WHERE id=$transcription_id";
    if ($conn->query($sql) === TRUE) {
        echo "Comment updated successfully";
    } else {
        echo "Error updating comment: " . $conn->error;
    }
}

// Fetch transcription data
$sql = "SELECT * FROM transcriptions";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Transcription Monitor</title>
    <style>
        body {
            font-family: 'Founders Grotesk', sans-serif;
            color: #333;
            margin: 0;
            padding: 20px;
            line-height: 1.25;
            font-size: 0.75em;
        }
        table {
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
            border-collapse: separate;
            border-spacing: 0;
            box-shadow: 0 2px 15px rgba(64, 64, 64, 0.1);
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
            position: relative;
        }
        th, td {
            padding: 5px;
            text-align: left;
        }
        th {
            background-color:#EF6F53 ;
            color: #fff;
            font-weight: bold;
            border-bottom: 1px solid #ddd;
            width: 17.5vw;
            font-size: 0.75rem;
        }
        td {
            border-bottom: 1px solid #ddd;
            font-size: 0.75rem;
        }
        tr:last-child td {
            border-bottom: none;
        }
        tr:hover {
            background-color: #f1f1f1;
        }
        form {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 0;
        }
        input[type="text"] {
            width: 70%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin:auto;
            margin-bottom: 10px;
        }
        input[type="submit"] {
            padding: 8px 12px;
            border: none;
            background-color: #364c63;
            color: white;
            cursor: pointer;
            border-radius: 4px;
            width: 10%;
        }
        input[type="submit"]:hover {
            background-color: #1a2532;
        }
        a {
            text-decoration: none;
            color: #007BFF;
        }
        a:hover {
            text-decoration: underline;
        }
        .table-container {
            overflow-x: auto;
            margin-bottom: 30px;
        }

        .table-container::-webkit-scrollbar {
            height: 8px;
        }

        .table-container::-webkit-scrollbar-thumb {
            background-color: #007BFF;
            border-radius: 4px;
        }

        .details {
            display: none;
        }

        tr{
            position: relative;
        }

        button.toggle-button {
            cursor: pointer;
            background-color: transparent;
            border: none;
            font-size: 16px;
            position: absolute;
            right: 10px; /* Aligns the button to the right end of the table */
            top: 50%;
            transform: translateY(-50%); /* Centers the button vertically */
        }
        /* Add this for the hover effect */
        td:hover .agent-sentiment-hover {
            display: block;
            position: absolute;
            background-color: #f9f9f9;
            padding: 5px;
            border: 1px solid #ccc;
            z-index: 1000;
            left: 100%; /* Adjusts the position next to the file name */
            top: 0;
            white-space: nowrap;
        }

        /* Hide the sentiment score initially */
        .agent-sentiment-hover {
            display: none;
        }

        /* After expanding, prevent the hover effect */
        tr.details-open td:hover .agent-sentiment-hover {
            display: none;
        }


        /* *********** */       

    </style>
    
    <script>
        function toggleDetails(button) {
            const currentRow = button.closest('tr');
            const detailsRows = [];
            let nextRow = currentRow.nextElementSibling;

            while (nextRow && nextRow.classList.contains('details')) {
                detailsRows.push(nextRow);
                nextRow = nextRow.nextElementSibling;
            }

            detailsRows.forEach(row => {
                if (row.style.display === 'none' || row.style.display === '') {
                    row.style.display = 'table-row';
                    button.textContent = '▲';
                    currentRow.classList.add('details-open');
                } else {
                    row.style.display = 'none';
                    button.textContent = '▼';
                    currentRow.classList.remove('details-open');
                }
            });
        }

    </script>
</head>
<body>
    <?php if ($result->num_rows > 0): ?>
        <?php while($row = $result->fetch_assoc()): ?>
            <table>
                <tr>
                    <th>File Name</th>
                    <td>
                        <?php echo htmlspecialchars($row['file_name']); ?>

                    </td>
                    <td>
                        <button class="toggle-button" onclick="toggleDetails(this)">▼</button>
                    </td>
                </tr>

                <tr class="details">
                    <th>Date Time</th>
                    <td><?php echo htmlspecialchars($row['date_time']); ?></td>
                </tr>
                <tr class="details">
                    <th>Agent Transcription</th>
                    <td><?php echo htmlspecialchars($row['agent_transcription']); ?></td>
                </tr>
                <tr class="details">
                    <th>Agent Translation</th>
                    <td><?php echo htmlspecialchars($row['agent_translation']); ?></td>
                </tr>
                <tr class="details">
                    <th>Agent Sentiment Score</th>
                    <td><?php echo htmlspecialchars($row['agent_sentiment_score']); ?></td>
                </tr>
                <tr class="details">
                    <th>Customer Transcription</th>
                    <td><?php echo htmlspecialchars($row['customer_transcription']); ?></td>
                </tr>
                <tr class="details">
                    <th>Customer Translation</th>
                    <td><?php echo htmlspecialchars($row['customer_translation']); ?></td>
                </tr>
                <tr class="details">
                    <th>Customer Sentiment Score</th>
                    <td><?php echo htmlspecialchars($row['customer_sentiment_score']); ?></td>
                </tr>
                <tr class="details">
                    <th>Abusive Count</th>
                    <td><?php echo htmlspecialchars($row['abusive_count']); ?></td>
                </tr>
                <tr class="details">
                    <th>Contains Financial Info</th>
                    <td><?php echo htmlspecialchars($row['contains_financial_info']); ?></td>
                </tr>
                <tr class="details">
                    <th>Comment</th>
                    <td>
                        <form method="POST">
                            <input type="hidden" name="transcription_id" value="<?php echo $row['id']; ?>">
                            <input type="text" name="comment" placeholder="Add comment">
                            <input type="submit" value="Update">
                        </form>
                    </td>
                </tr>
                <tr class="details">
                    <th>Download</th> <!-- New Download Row -->
                    <td>
                        <a href="/path/to/your/audio/files/<?php echo htmlspecialchars($row['file_name']); ?>" download>Download</a>
                    </td>
                </tr>
            </table>
            <br>
        <?php endwhile; ?>
    <?php else: ?>
        <p>No transcriptions found.</p>
    <?php endif; ?>
</body>
</html>

<?php
$conn->close();
?>

