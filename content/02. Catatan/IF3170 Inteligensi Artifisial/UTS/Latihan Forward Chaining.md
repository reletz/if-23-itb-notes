_Back to_ [[IF3170 Inteligensi Artifisial]]

![[Latihan Forward Chaining.jpg]]
![[Latihan Forward Chaining 2.jpg]]

## Latihan Forward Chaining

1. Diberikan _rule-set_ untuk menentukan buah (_fruit_) sebagai berikut:
    

|**No.**|**Rule**|
|---|---|
|**R1**|**IF** Seedcount = 1 **THEN** Seedclass = stonefruit|
|**R2**|**IF** Seedcount > 1 **THEN** Seedclass = multiple|
|**R3**|**IF** Shape = long and Color = yellow **THEN** Fruit = banana|
|**R4**|**IF** Shape = round and Diameter > 4 inches **THEN** Fruitclass = vine|
|**R5**|**IF** Shape = round and Diameter < 4 inches **THEN** Fruitclass = tree|
|**R6**|**IF** Fruitclass = vine and Surface = smooth **THEN** Fruit = watermelon|
|**R7**|**IF** Fruitclass = vine and Surface = rough and Color = tan **THEN** Fruit = honeydew|
|**R8**|**IF** Fruitclass = vine and Surface = smooth and Color = yellow **THEN** Fruit = cantaloupe|
|**R9**|**IF** Fruitclass = tree and Color = orange and Seedclass = stonefruit **THEN** Fruit = apricot|
|**R10**|**IF** Fruitclass = tree and Color = orange and Seedclass = multiple **THEN** Fruit = orange|
|**R11**|**IF** Fruitclass = tree and Color = red and Seedclass = multiple **THEN** Fruit = apple|

Tentukan semua buah yang sesuai (fakta yang diberikan pengguna) dengan menggunakan inferensi _forward chaining_.

Strategi yang digunakan adalah _refractoriness_ > _recency_ > _specifity_ >  _rule order_.

Kumpulan fakta pada _working memory_ adalah (sesuai urutan masuk ke WM):

- Diameter = 5 inch
- Shape = round
- Seedcount = 1
- Color = yellow
- Surface = smooth

Jawab:

|Iterasi|CS (Conflict Set)| R (Selected Rule)| WM (Working Memory)|
|---|---|---|---|
|1|{R2, R4}|R2 (Recency)| + Seedclass = multiple|
|2|{R2, R4}|R4 (Refractoriness)| + Fruitclass = vine|
|3|{R2, R4, R6, R8}|R8 (Specifity)| + Fruit = cantaloupe|
|4|{R2, R4, R6, R8}|R6 (Refractoriness)| + Fruit = watermelon|
|5|{R2, R4, R6, R8}|- | Stop |

-> Fruit = {cantaloupe, watermelon}



2. Diberikan _rule-set_ untuk menentukan penyakit berdasarkan gejala:
  
|**No.**|**Rule**|
|---|---|
|**R1**|**IF** suhu_badan > 38 **AND** badan_menggigil = true **THEN** demam = true|
|**R2**|**IF** durasi_batuk > 3 bulan **THEN** durasi = lama|
|**R3**|**IF** durasi_batuk > 1 bulan **AND** durasi_batuk < 3 bulan **THEN** durasi = sedang|
|**R4**|**IF** batuk = true **AND** tdknafsumakan = true **AND** durasi = lama **THEN** penyakit = tbc|
|**R5**|**IF** batuk = true **AND** tdknafsumakan = true **AND** demam = true **THEN** penyakit = radang_tenggorokan|
|**R6**|**IF** batuk = true **AND** durasi = lama **THEN** penyakit = alergi|
|**R7**|**IF** batuk = true **AND** durasi = sedang **AND** demam = true **THEN** penyakit = batuk_rejan|

Forward Chaining Strategy: _refractoriness_ > _specificity_ > _fact recency_

Fakta sesuai urutan masuk ke Working Memory (WM):
1. batuk = true
2. tdknafsumakan = true
3. suhu_badan > 38
4. badan_menggigil = true
5. durasi_batuk > 3 bulan
    
Lakukan proses _forward chaining_ (dimulai dari iterasi 1).

Jawab:

|Iterasi|CS (Conflict Set)| R (Selected Rule)| WM (Working Memory)|
|---|---|---|---|
|1|{R1, R2}|R1 (Specifity) |+ demam = true|
|2|{R1, R2, R5}| R5 (Specifity)| + penyakit = radang_tenggorokan|
|3|{R1, R2, R5}| R2 (Refractoriness)| + durasi = lama|
|4|{R1, R2, R5, R4, R6} | R4 (Specifity)| + penyakit = tbc |
|5|{R1, R2, R5, R4, R6} | R6 (Refractoriness)| + penyakit = alergi |
|6|{R1, R2, R5, R4, R6} | - | stop |