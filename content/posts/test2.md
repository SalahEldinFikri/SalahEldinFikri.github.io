---
title: "test2"
slug: "test2"
description: "test"
topics: ["test"]
date: 2024-11-07T18:04:34.611Z
---

<ul><li><a href="https://cryptopals.com/sets/1" rel="noopener noreferrer" target="_blank" style="color: inherit;">Set 1: Basics</a></li><li><a href="https://cryptopals.com/sets/2" rel="noopener noreferrer" target="_blank" style="color: inherit;">Set 2: Block crypto</a></li><li><a href="https://cryptopals.com/sets/3" rel="noopener noreferrer" target="_blank" style="color: inherit;">Set 3: Block &amp; stream crypto</a></li><li><a href="https://cryptopals.com/sets/4" rel="noopener noreferrer" target="_blank" style="color: inherit;">Set 4: Stream crypto and randomness</a></li><li><a href="https://cryptopals.com/sets/5" rel="noopener noreferrer" target="_blank" style="color: inherit;">Set 5: Diffie-Hellman and friends</a></li><li><a href="https://cryptopals.com/sets/6" rel="noopener noreferrer" target="_blank" style="color: inherit;">Set 6: RSA and DSA</a></li><li><a href="https://cryptopals.com/sets/7" rel="noopener noreferrer" target="_blank" style="color: inherit;">Set 7: Hashes</a></li><li><a href="https://cryptopals.com/sets/8" rel="noopener noreferrer" target="_blank" style="color: inherit;">Set 8: Abstract Algebra</a></li></ul><h1>Crypto Challenge Set 1</h1><p><a href="https://cryptopals.com/sets/1/challenges/1" rel="noopener noreferrer" target="_blank" style="color: inherit;">Convert hex to base64</a>&nbsp;:</p><p><br></p><pre class="ql-syntax" spellcheck="false">import base64
def b64 (str) :
 str = bytes.fromhex(str)
 print("Raw : ",end="") ; print(str)
 return base64.b64encode(str)
 
str = "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d"
</pre><p>print(b64(str))<a href="https://cryptopals.com/sets/1/challenges/2" rel="noopener noreferrer" target="_blank" style="color: inherit;">Fixed XOR</a>&nbsp;:</p><pre class="ql-syntax" spellcheck="false">def xor (str_1,str_2) :
    str_1 = bytearray.fromhex(str_1)
    str_2 = bytearray.fromhex(str_2)
    for i in range(len(str_1)) :
        str_1[i] = str_1[i]^str_2[i]
    return str_1.hex()



print(xor_hex("1c0111001f010100061a024b53535009181c","686974207468652062756c6c277320657965"))
</pre><p><a href="https://cryptopals.com/sets/1/challenges/3" rel="noopener noreferrer" target="_blank" style="color: inherit;">Single-byte XOR cipher</a>&nbsp;:</p><pre class="ql-syntax" spellcheck="false">
def brute_force(msg,key) :
 msg = bytearray.fromhex(msg)
 for i in range(len(msg)) :
  msg[i] = msg[i]^key
 return msg

str = "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736"
for i in range(256) :
 print(f"key is : {i} ----",end='')
 print(brute_force(str,i))
</pre><p><a href="https://cryptopals.com/sets/1/challenges/4" rel="noopener noreferrer" target="_blank" style="color: inherit;">Detect single-character XOR</a>&nbsp;:</p><pre class="ql-syntax" spellcheck="false">def brute_force(msg,key) :
    msg = bytearray.fromhex(msg)
    for i in range(len(msg)) :
     msg[i] = msg[i]^key
    return msg

#English = "abcdefghijklmnopqrstuvqxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\'0123456789"
f = open("enc","r")
str =f.readlines()
cnt = 1
for line in str :
    print("Line number {}  ### ".format(cnt))
    cnt+=1
    for i in range(256) :
         dec = brute_force(line,i)
         if b" " and b'the' in dec : # :"D no freq. analysis , no bullshit :"D
            print(dec)
</pre><p><a href="https://cryptopals.com/sets/1/challenges/5" rel="noopener noreferrer" target="_blank" style="color: inherit;">Implement repeating-key XOR</a>&nbsp;:</p><pre class="ql-syntax" spellcheck="false">def brute_force () :
    msg = bytearray(b"""Burning 'em, if you ain't quick and nimble
I go crazy when I hear a cymbal""")
    key = bytearray(b"ICE")
    for i in range(len(msg)) :
        msg[i]=msg[i]^key[i%3]
    return msg.hex()

print(brute_force())
</pre><p><a href="https://cryptopals.com/sets/1/challenges/6" rel="noopener noreferrer" target="_blank" style="color: inherit;">Break repeating-key XOR</a>&nbsp;:</p><p><a href="https://cryptopals.com/sets/1/challenges/7" rel="noopener noreferrer" target="_blank" style="color: inherit;">AES in ECB mode</a>&nbsp;:</p><pre class="ql-syntax" spellcheck="false">import base64
from Crypto.Cipher import AES

f = open("enc",'r')     #original cipher text
f2 = open("decrepted",'a')  #final secret plain text
f3 = open("b64_decoded",'w')    #base64 decoded cipher text 

obj = AES.new("YELLOW SUBMARINE",AES.MODE_ECB)
b64_decoded = base64.b64decode(f.read())
f3.write(b64_decoded)

f3.close()
f3 = open("b64_decoded",'r')

while True :
    cipher = f3.read(16)
    f2.write(obj.decrypt(cipher))
    if len(cipher) &lt; 16 :
        break

f.close()
f2.close()
f3.close()
</pre><p><a href="https://cryptopals.com/sets/1/challenges/8" rel="noopener noreferrer" target="_blank" style="color: inherit;">Detect AES in ECB mode</a>&nbsp;:</p><pre class="ql-syntax" spellcheck="false">f = open("enc.txt",'r')

def detect_ECB (block,str1) :
    i = 0
    while i &lt; 320 :
        chunk = str1[i:i+16]
        if chunk in str1[i+16:] :
            return True , block
        i+=16
    return False,-1

def print_block(no) :
    f.seek(0)
    str1 = f.read()[0+320*no:320+320*no]
    print(str1)

block = 1
det_list = []

while True :
    str1 = f.read(320)
    str2 = bytearray(f.read(320))
    status,no = detect_ECB(block,str2)    
    if status :
        print("Block number : {}".format(no))
        det_list.append(no-1)        
    if len(str1) &lt; 320 :
        break
    block+=1

for x in det_list :
    print_block(x)

f.close()
</pre><p><br></p>