---
layout: post
title: "How to repair a broken GRUB in Ubuntu?"
date: "2017-08-28 13:35:42 +0530"
tag:
  - Ubuntu
  - GRUB
  - How-to
excerpt: Steps to restore your GRUB if you have formatted boot partition mistakenly
---

![How to repair a broken GRUB]({{
site.url}}{{ site.baseurl }}/assets/images/how_to_fix_broken_grub/grub_title.png)

## Background story

Yesterday, I was having some free time after lunch. I decided to complete a long
term plan of checking the compatibility of few [Freedom Operating
Systems][freedom] with my workstation. From [this list][freedom_oses], I decided
to check [Trisquel][trisquel] OS first.  [Trisquel][trisquel] is freedom clone
of world-famous OS Ubuntu. The simplest option was to prepare a live USB drive
and boot the [Trisquel][trisquel] from it. I inserted the USB drive and
instructed the [Gparted][gparted] to format it. Bang!  That simple step ruined
my entire Sunday evening. Instead of formatting my USB drive, I mistakenly
formatted the boot partition! Without putting any extra measures, I formatted my
root partition which is also a type [FAT][fat]. I was lucky enough to identify
that I have formatted the partition from my SSD and not the USB drive. After
taking advice from the people of [##linux][linux_irc_channel] I found, I will
not be able to re-boot because the [GRUB][GRUB] is lost. In this post, I will
describe the steps I followed to restore the [GRUB][GRUB].


## Procedure of restoring the GRUB


You can restore your [GRUB][GRUB] using three methods:

* Using GUI utility [“Boot-repair”][boot_repair]. This is the simplest step to
follow first.  Unfortunately, I was not able to fix my [GRUB][GRUB] using this
method.

* Boot from a live operating system, mount the infected boot partition and
perform the steps of restoring the [GRUB][GRUB]. Since I identified the problem at an
early stage, I didn’t restart my system until I was sure that nothing is
broken.

* Last is to run the steps of restoring the [GRUB][GRUB] from the command line
if you haven’t reboot your system after formatting the boot partition. I will
describe the steps of restoring your [GRUB][GRUB] using this method in this
post.

If you had rebooted and are unable to start the system then I will request to
follow the steps described at [How to geek][how_to_geek] post rather than
continuing here. If you are using Legacy BIOS rather than UEFI type then this
post might not work for you. To identify which type your system has booted with,
[follow this steps][bios_or_uefi].

## So let’s start!

* **Identify the type of your boot partition:** You can use GUI utilities like
[GParted][gparted] or any other of your choice. The boot partition is the very
first partition of the drive you are using for booting your operating system.

  ![Identify boot partition using gparted]({{
  site.url}}{{ site.baseurl }}/assets/images/how_to_fix_broken_grub/gparted_identification_parition.png)

  In my case, it is `/dev/sda1`. This partition should be either [FAT32][fat32]
  or [FAT16][fat16].  If it is anything other than that you should format it to
  [FAT][fat] version of your choice.

* **Assert `/boot/efi` is mounted:** Run below command at your terminal.

  ``` sudo mount /boot/efi ```

  Sample output

  ```
  $sudo mount /boot/efi/
  mount: /dev/sda1 is already mounted or /boot/efi busy
         /dev/sda1 is already mounted on /boot/efi
  ```
  If it is mounted, it will throw a warning indicating that the partition is
  already mounted. If it isn’t mounted, then the prompt will come back without
  any warning message.

* **Next, restore and update the [GRUB][GRUB]:** Run below command at your terminal.

  ``` sudo grub-install && update-grub ```

  Sample output
  ```
  $ sudo grub-install && update-grub
  Installing for x86_64-efi platform.
  Installation finished. No error reported.
  ```

  If there is any error, I will advise to not move further and try other
  options I mentioned above for restoring your [GRUB][GRUB].

* **Finally, replace the UUID of the formatted partition:** Find the **UUID** of
your boot partition. Once you format the partition, the **UUID** of the
partition is changed. You have to update the new **UUID** value at `/etc/fstab`
file. Use below command to get the latest **UUID** of your boot partition.

  ```sudo blkid /dev/sda1```

  ![Identifying UUID of boot efi]({{
  site.url}}{{ site.baseurl }}/assets/images/how_to_fix_broken_grub/uuid_blkid_shell.png)

  Copy the value of **UUID** which is between the double quotes.

  Open the `/etc/fstab` file with your desired editor and update the value with
  the existing **UUID** of `/dev/sda1`. I am doing this procedure using the
  [vim][vim] editor.  You can choose any editor of your choice.

  ```sudo vim /etc/fstab```

  ![Updating the UUID to the etc fstab file]({{
  site.url}}{{ site.baseurl }}/assets/images/how_to_fix_broken_grub/vim_etc_fstab.png)

  You will require the root privileges for writing to this file.

We are done! Now when you will run `sudo ls -l /boot/efi`, you should able to
identify the files beneath that directory. It is time to confirm by rebooting
your system.

## Vote of Thanks!

I would like to thank [ioria][ioria] and [ducasse][ducasse], member of
[#ubuntu][ubuntu_irc_channel] at Freenode, who invested a great amount of time
to guide me in fixing this problem. [#ubutu][ubuntu_irc_channel] has great
members who are always willing to help you.

*Note: While mentioning the GRUB in this post, I actually mean the GRUB2.*


###### Proofreaders: [Dhavan Vaidya](http://codingquark.com/), Pentode@##linux(Freenode), parsnip@#emacs (Freenode)

[GRUB]: https://www.gnu.org/software/grub/
[trisquel]: https://trisquel.info/
[gparted]: http://gparted.org/
[fat]: https://en.wikipedia.org/wiki/File_Allocation_Table
[fat32]: https://en.wikipedia.org/wiki/File_Allocation_Table#FAT32
[fat16]: https://en.wikipedia.org/wiki/File_Allocation_Table#FAT16
[linux_irc_channel]: https://freenode.linux.community/
[boot_repair]: https://help.ubuntu.com/community/Boot-Repair
[vim]: http://www.vim.org
[ubuntu_irc_channel]: irc://irc.freenode.net/ubuntu
[ioria]: https://launchpad.net/~di-iorio
[ducasse]: https://launchpad.net/~ducasse
[freedom_oses]: https://www.gnu.org/distros/free-distros.en.html
[freedom]: https://www.gnu.org/philosophy/free-sw.en.html
[how_to_geek]: https://www.howtogeek.com/114884/how-to-repair-grub2-when-ubuntu-wont-boot/
[bios_or_uefi]: https://askubuntu.com/a/162896
