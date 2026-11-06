#!/usr/bin/env python3
"""Summarize V8 samples; inclusive samples are deduplicated per function/frame."""
import collections
import json
from pathlib import Path
import sys


def summarize(path):
    data=json.loads(path.read_text())
    nodes={n["id"]:n for n in data["nodes"]}
    parents={child:n["id"] for n in data["nodes"] for child in n.get("children",[])}
    own=collections.Counter();inclusive=collections.Counter()
    def key(node):
        f=node["callFrame"]
        return (f["functionName"] or "(anonymous)", f["url"], f["lineNumber"]+1)
    for sample,delta in zip(data["samples"],data["timeDeltas"]):
        own[key(nodes[sample])]+=delta
        seen=set();current=sample
        while current in nodes:
            seen.add(key(nodes[current]));current=parents.get(current)
        for frame in seen:inclusive[frame]+=delta
    total=sum(data["timeDeltas"])
    def table(values,app_only=False):
        selected=[(k,v) for k,v in values.most_common() if not app_only or "/src/" in k[1]][:20]
        return [{"function":k[0],"url":k[1],"profile_line":k[2],
                 "sampled_seconds":round(v/1e6,6),"percent_of_sample_span":round(v/total*100,4)}
                for k,v in selected]
    return {"profile":path.name,"profile_span_seconds":(data["endTime"]-data["startTime"])/1e6,
            "sampled_seconds":total/1e6,"sample_count":len(data["samples"]),
            "self":table(own),"inclusive_app":table(inclusive,True),
            "limits":"Sampled time, not exact call counts. Inclusive rows overlap; do not sum. Profile frame lines refer to transformed modules, not original TS line numbers."}


if __name__=="__main__":
    path=Path(sys.argv[1])
    print(json.dumps(summarize(path),indent=2))
