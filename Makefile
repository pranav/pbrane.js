default=run

run: 
	mkdir build
	touch build/pbrain.js
	cat pbrane.js >> build/pbrain.js
	cat util/Vector2D.js >> build/pbrain.js
	cat util/Drawing.js >> build/pbrain.js
	echo 'Build all done. Located at build/pbrain.js'

clean: 
	rm build/pbrain.js
	rm -rf build