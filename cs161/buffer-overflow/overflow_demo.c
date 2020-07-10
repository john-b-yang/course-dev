#include <stdio.h>
#include <string.h>

int main(void) {
  char buffer[15];
  int isValidPass = 0;

  printf("Enter your password: ");
  gets(buffer);

  if (strcmp(buffer, "cs161rulezzz")) {
    printf("Wrong Password\n");
  } else {
    printf("Correct Password\n");
    isValidPass = 1;
  }

  if (isValidPass) {
    printf("Logged In. Welcome back, hacker.\n");
  }

  return 0;
}
