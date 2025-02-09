# Games

This directory is the saved log of the games in the app.
The choice for the games here to be added manually is made
to allow other users to access the game format without
credentaials, and then if needed an admin with the credentials
can manually add the game, which is a small json file, to the directory.

## How to add the games?

Copy the save file (will be named `TIMESTAMP.json`) 
to the directory.
And for it to be active add its entry to `_GameList.json`
as follows:
``` json
{ "id": 0, "filename": "TIMESTAMP.json" }
```

### Example adding to `_GameList.json`

If the previous state of the file was:
``` json
[
  { "id": 0, "filename": "2025-02-03T07_31_55.033Z.json" },
  { "id": 1, "filename": "2025-02-03T09_31_55.033Z.json" }
]
```

and you wanted to add `2025-02-03T09_37_15.343Z.json`,
then it becomes:

``` json
[
  { "id": 0, "filename": "2025-02-03T07_31_55.033Z.json" },
  { "id": 1, "filename": "2025-02-03T09_31_55.033Z.json" },
  { "id": 2, "filename": "2025-02-03T09_37_15.343Z.json" }
]
```

### Reminders
* Don't forget that every entry in the JSON file 
should end with a comma except the last one.
* BOTH the json file you want to add should be copied,
and its name should be added in the entry log.