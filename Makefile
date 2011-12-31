default=run

run: 
	mkdir build
	touch build/pbrane.js
	cat pbrane.js >> build/pbrane.js
	cat util/Vector2D.js >> build/pbrane.js
	cp build/pbrane.js example/pbrane.js
	cat util/Drawing.js >> build/pbrane.js
	echo 'Build all done. Located at build/pbrane.js'

clean: 
	rm build/pbrane.js
	rm example/pbrane.js
	rm -rf build