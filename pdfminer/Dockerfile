FROM python:3

RUN git clone https://github.com/pdfminer/pdfminer.six
WORKDIR pdfminer.six
RUN python setup.py install
RUN pdf2txt.py samples/simple1.pdf
RUN ls samples
WORKDIR /
VOLUME /docs
WORKDIR /docs