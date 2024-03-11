# cli_counter_wordle
A command line tool to help solving wordle puzzle.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Help on "Command Line Interface" (cli) for 5-letter counter wordle:
your input in terminal should be as following format:

    node cli_counterWordle.js <Excluded letters or 0> <Included letters or 0> <Perfect/fixed letters>
    
EXPLAINATION:

    node cli_counterWordle.js : It is command to run the programm in terminal
    <Excluded letters or 0>   : If there is any letter to exclude you can type them here without any space in between.
                                If there is not any letter to exclude just type 0 to skip to next arguement.
    <Included letters or 0>   : If there is any letter to Include you can type them here without any space in between.
                                If there is not any letter to Include just type 0 to skip to next arguement.
    <Perfect/fixed letters>   : If there are letter who are included in targeted words and there position is fixed,
                                type the known letter in right position and use dot "." for empty position.
                                Example: "fr..." for words which starts with fr "..a.e" for words containing a in the middle
                                and e at the end.
                                
                                
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
