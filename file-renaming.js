const fs = require ("fs");

fs.renamesync("./newfile.js", "newDir/newfile2"); 

// preimenujemo in hkrati tudi prestavimo datoteke v mapo newDir
// Sync pomeni, da program počaka, da se proces konča

fs.renamesync("./newDir/ChildDir", "./ParentDir");

// podobno deluje za mape (fajli brez končnice), tudi preimnovanje mape na voljo