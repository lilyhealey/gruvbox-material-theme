# this is a level-one heading
## level-two heading
### level-three heading
#### level-four heading
##### level-five heading
###### level-six heading

add emphasis with *asterisks* or _underscores_.
add strong emphasis with **double asterisks** or __double underscores__.
combined emphasis with **asterisks and _underscores_**.
strikethrough uses two tildes. ~~scratch this.~~

lists
1. first ordered list item
2. another item
   * unordered sub-list
   * and another item in that sub list
3. actual numbers don't matter, really?

* unordered lists can use asterisks
- or minuses
+ or pluses

unordered list:
- bedfordshire
- berkshire
- bristol
- buckinghamshire

ordered list:
1. cambridgeshire
2. cheshire
3. city of london
4. cornwall
5. cumbria

# Quotes
from `Good People` by David Foster Wallace:
> she had always seemed to Lane to be on good terms with her life in a way that 
> age could not account for.

And here's a link to the story: [Good People](http://www.newyorker.com/magazine/2007/02/05/good-people)

Task Lists
- [x] Finish my changes
- [ ] Push my commits to GitHub
- [ ] Open a pull request

| Table Header | Second Table Header |
| ------------ | ------------------- |
| cell         |                     |


```javascript
var p = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('foo');
  }, 300);
})

p.then(function(value) {
  console.log(value);
  // expected output: "foo"
});

console.log(p);
// expected output: [object Promise]
```

```python
for i in range(10):
  print(i)
```

```php
$str = 'hi';
for ($i = 0; $i < 10; $i++) {
  echo "$str";
}
```
