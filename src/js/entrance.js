class Entrance extends Room {
    constructor() {
        super("entrance");
    }

    roomLore() {
        textFeed("You are in an empty room. Well, it would be empty if not for this vehicle directly in");
        textFeed("the center of it. There is a man here as well. You aren't sure what you have to do,");
        textFeed("but you know you should probably LOOK at things, or perhaps TALK to people. Maybe even");
        textFeed("WALK or GO somewhere.\n");
        textFeed("\n");
        textFeed("Obvious exits are NORTH, SOUTH, EAST and WEST.");
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
            else if (second == "MAN") {
                textFeed("It's your sales trainer. He's got some note cards.");
            }
            else if (second == "VEHICLE") {
                textFeed("It's the new Encore GX. You notice the mirror caps are black.");
            }
        }
        if (first == "TALK") {
            if (command == "TALK") {
                textFeed("You have a pleasant conversation with yourself. The man here in the room with you is");
                textFeed("staring at you. He looks concerned for your mental health.");
            }
            else if (second == "MAN" || second == "TRAINER" || (second == "SALES" && third == "TRAINER")) {
                textFeed("'Hello! My name is Sales Trainer and I'm here to teach you all about the new Encore GX!");
                textFeed("Look at it's cool black mirror caps!'");
            }
            else if (second == "SALES") {
                textFeed("You turn to the man and say 'Let's talk sales.' The man looks at you confused and asks");
                textFeed("'Why do you want to talk about me?'");
                this.processCommand("TALK MAN");
            }
            else if (second == "TO") {
                if (command == "TALK TO") {
                    textFeed("Talk to who? You started saying you wanted to talk to somebody, but then you sort of just");
                    textFeed("trailed off.")
                } else {
                    switch (third) {
                        case "SALES":
                        case "TRAINER":
                        case "MAN":
                            this.processCommand("TALK MAN");
                            break;
                    }
                }
            }
        }
    }
}