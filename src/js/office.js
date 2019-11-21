class Office extends Room {
    constructor() {
        super("office");
    }

    roomLore() {
        textFeed("You have walked into your manager's office. He doesn't seem to be here right now.");
        textFeed("His COMPUTER is sitting on his desk. There is a picture of a VEHICLE on the wall.");
        textFeed("There is also a PHONE on the desk.")
        textFeed("");
        textFeed("Obvious exits are SOUTH.");
    }

    processCommand(command) {
        //Split up the command to make things easier
        let first = command.split(" ")[0];
        let second = command.split(" ")[1];
        let third = command.split(" ")[2];
        let fourth = command.split(" ")[3];
        if (first == "GO" || first == "WALK") {
            if (command == "GO" || command == "WALK") {
                textFeed("Where are you going?");
            }
            else if (second == "NORTH") {
                textFeed("You go NORTH.");
            }
            else if (second == "SOUTH") {
                textFeed("You go SOUTH.");
            }
            else if (second == "EAST") {
                textFeed("You go EAST.");
            }
            else if (second == "WEST") {
                textFeed("You go WEST.");
            } else {
                textFeed("Wait. where do you want to go?")
            }
        }
        if (first == "LOOK") {
            if (command == "LOOK") {
                this.roomLore();
            }
            else if (second == "COMPUTER") {
                textFeed("It's a pretty old Gateway Desktop. It's running on Windows XP. It looks like your");
                textFeed("manager has logged out, and the computer is password protected.");
            }
            else if (second == "VEHICLE") {
                textFeed("It's the new Encore GX. You notice the mirror caps are black.");
            }
            else if (second == "PHONE") {
                textFeed("It's your typical office phone. There's a sticky note on it that reads 'Press 9");
                textFeed("to dial out.");
            }
        }
        if (first == "TALK") {
            if (command == "TALK") {
                textFeed("You have a pleasant conversation with yourself.");
            }
            else if (second == "COMPUTER") {
                textFeed("You say 'Hello' to the computer. Unfortunately it doesn't respond. It does not have");
                textFeed("voice recognition.");
            }
            else if (second == "PHONE") {
                textFeed("You pick up the phone and talk. The phone responds with a dial tone.");
            }
            else if (second == "TO") {
                if (command == "TALK TO") {
                    textFeed("Talk to who? You started saying you wanted to talk to somebody, but then you sort of just");
                    textFeed("trailed off.")
                } else {
                    switch (third) {
                        case "COMPUTER":
                            this.processCommand("TALK COMPUTER");
                            break;
                        case "PHONE": {
                            this.processCommand("TALK PHONE");
                        }
                    }
                }
            }
        }
    }
}