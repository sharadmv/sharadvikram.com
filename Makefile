.PHONY: cv

cv:
	cd cv && $(MAKE) compile
	cp cv/resume.pdf public/pdf/cv-sharadvikram.pdf
	cd cv && $(MAKE) clean
