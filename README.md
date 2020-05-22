![](https://github.com/sunderipranata/ybbo/workflows/deploy%20production/badge.svg)
![](https://github.com/sunderipranata/ybbo/workflows/Mirroring/badge.svg)
![](https://github.com/sunderipranata/ybbo/workflows/Node.js%20CI/badge.svg)

A Project by https://github.com/sahabat-produktif

# Deployments
### Preview
The pipeline will automatically deploy preview for every push to **master** OR every **push containing** "**[preview]**" in the commit message. <br><br>
*ybbobot* will automatically add link on the comment of the deployed commit. <br>
Example: ![this commit](https://github.com/sunderipranata/ybbo/pull/12/commits/81b4e882d948d44641934cd3b7e4db836ac740c3)

If you need, you can trigger preview deployment with an empty commit like this: <br>
`git commit --allow-empty -m "[preview]"`

<br>

### Production
You can release to production by creating a release tag beginning with **release-** <br>
You are encouraged to put the date & the time of release tag creation. <br><br>
Example: **release-20200518-2008** stands for a release tag created at 18 May 2020 at 20:08
