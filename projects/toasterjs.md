**Description:** toaster.js is an API for controlling electronic devices. First, we hijacked powerstrips, cutting them open and attaching a radio-controlled arduino. The arduino was able to turn the powerstrip on and off, and also monitor the power usage. Then, we created a hub that could communicate with multiple such hijacked powerstrips. Finally, we exposed these as a REST api, where doing a `POST` to say, `/device/1`, could turn it on or off. We then built several applications on top of the API; these included: 

* a website where you could control the devices in your home by clicking on them and turning them on and off, while monitoring your current energy usage and power bill
* an android application which could turn off and on devices with voice commands
* an iPhone app to turn off lights with a flick of the iPhone.

**Members:** [Gerald Fong](http://geraldfong.com/), Li Pi, [Abi Raja](https://github.com/abi), Sharad Vikram

**Awards:** Winner Greylock Hackfest 2012

**Press:** [Wall Street Journal](http://blogs.wsj.com/venturecapital/2012/07/23/greylock-hackers-show-top-engineering-talent-and-sleep-deprivation/)
