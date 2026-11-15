/* Read-only alignment observations; same license as Angband's native observer.
 * No player writes, RNG draws, knowledge updates, or policy changes. */
void measure_alignment(const char *stage)
{
    int i;
    if (!trace) return;
    fprintf(trace, "ALIGN_RNG {\"stage\":\"%s\",\"quick\":%s,\"value\":%lu,\"stateI\":%lu,\"state\":[", stage,
        Rand_quick ? "true" : "false", (unsigned long)Rand_value, (unsigned long)state_i);
    for (i=0;i<RAND_DEG;i++) fprintf(trace,"%s%lu",i?",":"",(unsigned long)STATE[i]);
    fprintf(trace,"]}\n"); fflush(trace);
}

static void alignment_birth(void)
{
    int i, n=0;
    struct object *obj;
    fprintf(trace,"ALIGN_BIRTH {\"race\":\"%s\",\"class\":\"%s\",\"gold\":%ld,\"hp\":%d,\"maxHp\":%d,\"sp\":%d,\"maxSp\":%d,\"grid\":[%d,%d],\"stats\":[",player->race->name,player->class->name,(long)player->au,player->chp,player->mhp,player->csp,player->msp,player->grid.x,player->grid.y);
    for(i=0;i<STAT_MAX;i++)fprintf(trace,"%s%d",i?",":"",player->stat_birth[i]);
    fprintf(trace,"],\"inventory\":[");
    for(obj=player->gear;obj;obj=obj->next){
        int slot=object_slot(player->body,obj);
        fprintf(trace,"%s{\"tval\":%d,\"sval\":%d,\"number\":%d,\"weight\":%d,\"slot\":%d,\"timeout\":%d,\"dd\":%d,\"ds\":%d,\"toH\":%d,\"toD\":%d,\"toA\":%d}",n++?",":"",obj->tval,obj->sval,obj->number,obj->weight,slot,obj->timeout,obj->dd,obj->ds,obj->to_h,obj->to_d,obj->to_a);
    }
    fprintf(trace,"]}\n");
    fprintf(trace,"ALIGN_TERRAIN {\"height\":%d,\"width\":%d,\"terrain\":[",cave->height,cave->width);
    for(int y=0;y<cave->height;y++)for(int x=0;x<cave->width;x++)fprintf(trace,"%s%d",(x||y)?",":"",cave->squares[y][x].feat);
    fprintf(trace,"]}\n");fflush(trace);
}
