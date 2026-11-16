/* Extracted unchanged from f3082213b73f3e463e3d0d60bff4b00462beae6e:src/cave-view.c; only dependencies stubbed. */
#include <stdbool.h>
#include <stdio.h>
struct loc { int x,y; };
struct player { struct loc grid; };
struct chunk { bool seen; };
static struct chunk storage;
static struct chunk *cave=&storage;
static bool square_isseen(struct chunk *c, struct loc grid) { (void)grid; return c->seen; }
bool no_light(const struct player *p)
{
	return (!square_isseen(cave, p->grid));
}
int main(void) { struct player p={{0,0}}; for(int seen=0;seen<2;seen++){ storage.seen=seen; printf("seen=%d no_light=%d\n",seen,no_light(&p)); } }
