cv: cv/resume.pdf
	cd cv && $(MAKE) compile
	cp cv/resume.pdf public/pdf/cv-sharadvikram.pdf
	cd cv && $(MAKE) clean
