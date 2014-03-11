munin-coind
===========

## install

### step1

```
git clone https://github.com/you21979/munin-coind.git
cd munin-coind
npm install
```

### step2

```
cd config
cp litecoin.json.org litecoin.json
vi litecoin.json
```

write your coin-deamon network address;


### step3

```
ln -s coininfo.js /etc/munin/plugins/litecoin
```

done
