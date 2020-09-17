#include <stdio.h>
#include <unistd.h>

int main(int argc, char **argv) {
 // Buffer for storing "cat" command
 char cat[] = "cat ";
 // Store command string + length
 char *command;
 size_t commandLength;

 // Create command: `cat <user argument>`
 commandLength = strlen(cat) + strlen(argv[1]) + 1;
 command = (char *) malloc(commandLength);
 strncpy(command, cat, commandLength);
 strncat(command, argv[1], (commandLength - strlen(cat)) );

 // Execute System Call (Vulnerability!)
 system(command);
 return (0);
}
