# Remove old node (in case of crash)
If 1 node crash without recovery option:

**Delete from cluster** `ceph mon remove <NODE-NAME>`

### In case of ceph storage
find the ceph osd.X name with :

`ceph osd tree`:

| ID  | CLASS | WEIGHT  | TYPE | NAME             | STATUS | REWEIGHT | PRI-AFF |
|-----|-------|---------|------|------------------|--------|----------|---------|
| -1  |       | 1.36436 | root | default          |        |          |         |
| -3  |       | 0.45479 |      | host <NODE-NAME1>|        |          |         |
|  0  | ssd   | 0.45479 |      | osd.0            | up     | 1.00000  | 1.00000 |
| -7  |       | 0.45479 |      | host <NODE-NAME2>|        |          |         |
|  2  | ssd   | 0.45479 |      | osd.2            | up     | 1.00000  | 1.00000 |
| -5  |       | 0.45479 |      | host <NODE-NAME3>|        |          |         |
|  1  | ssd   | 0.45479 |      | osd.1            | up     | 1.00000  | 1.00000 |

**Mark it as out and delete it:** `ceph osd out osd.X` `ceph osd crush remove osd.X` `ceph osd crush remove <NODE-NAME>` `ceph auth del osd.X` `ceph osd rm osd.X` `ceph auth del mon.<NODE-NAME>` `ceph auth del client.bootstrap-mgr.<NODE-NAME>` `ceph auth del mgr.<NODE-NAME>`

Is missing part for the monitoring, do it from web interface:
- select an active node
- go a on *Monitor* menu under *CEPH* section
- In monitor, choose your obsolete node and click on *Destroy*

And delete node ip from field *mon_host* in *'/etc/pve/ceph.conf'*