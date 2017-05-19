
	var BLOCK_CATEGORIES = ["VR functions","Logic", "Loops", "Math","Variables"];
	var category_index = -1;
	var FLYOUT_BLOCKS_WIDTHS = {"VR functions":[], "Logic":[], "Loops":[], "Math":[], "Variables":[]};
	var FLYOUT_RANGE = {"VR functions":[], "Logic":[], "Loops":[], "Math":[], "Variables":[]};
	var BLOCK_SELECTED_FOR_MOVE;
	var init = true;
	var COUNT_DRAWERS = 5;

		
	Control = function(){
		this.flyoutOpen = false;
		this.chosenDrawer = "";
		this.blocks = [];
		this.currentBlock = null;
		this.candidateBlock = null;
		this.workSpace = Blockly.mainWorkspace;
	}
	
	
	

	Control.prototype.getHoveringPlace = function(cursorPosition){
		var currentY = cursorPosition[1];
		var DRAWER_BOUNDARY =  window.innerHeight - document.getElementsByClassName('blocklyToolboxDiv')[0].offsetHeight;
		if(currentY >= DRAWER_BOUNDARY){
			return "drawer";
		}
		return "viewer";
	}
	

	Control.prototype.openClosestFlyout = function(cursorPosition){
		var currentY = cursorPosition[0];
		var CATEGORY_WIDTH = document.getElementsByClassName('blocklyToolboxDiv')[0].offsetWidth/COUNT_DRAWERS;
		if( currentY <= CATEGORY_WIDTH ){
			category_index = 0;
		}else if(CATEGORY_WIDTH < currentY && currentY <= CATEGORY_WIDTH * 2){
			category_index = 1;
		}else if(CATEGORY_WIDTH * 2 < currentY && currentY <= CATEGORY_WIDTH * 3){
			category_index = 2;
		}else if(CATEGORY_WIDTH * 3 < currentY && currentY <= CATEGORY_WIDTH * 4){
			category_index = 3;
		}else{
			category_index = 4;
            this.getVariableBlocksPosition();
		}
		if(category_index != -1){
			control.chosenDrawer = BLOCK_CATEGORIES[category_index];
			Blockly.mainWorkspace.toolbox_.tree_.getChildren()[category_index].select();
		}

	}

	Control.prototype.closeFlyout = function(){
		this.chosenDrawer = "";
		this.flyoutOpen  = false;
		Blockly.mainWorkspace.toolbox_.flyout_.hide();
		
	}

    Control.prototype.hoverOverViewer = function(cursorPosition){
        this.candidateBlock = null;
        var shortestDistance = 1000;
        var closestBlock = null;
        if(BLOCK_SELECTED_FOR_MOVE!=null){
            BLOCK_SELECTED_FOR_MOVE.unselectForOtherMove()
        }
        if(!Blockly.mainWorkspace.toolbox_.flyout_.isVisible()){//flyout should be closed
            this.blocks.forEach(function(block){
                var blockX = block.blockSvg.getRelativeToSurfaceXY()['x'];
                var blockY = block.blockSvg.getRelativeToSurfaceXY()['y'];
                var deltaX = cursorPosition[0] - blockX;
                var deltaY = cursorPosition[1] - blockY;
                var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
                if(distance < shortestDistance){
                    closestBlock = block;
                    shortestDistance = distance;

                }

            });
            if(closestBlock!=null){
			    closestBlock.blockSvg.select();
                if(cursorPosition[2] < 200){
                    this.candidateBlock = closestBlock;
                }
            }
        }
    }

    Control.prototype.hoverOverFlyout = function(cursorPosition){
        this.candidateBlock = null;
        if(Blockly.mainWorkspace.toolbox_.flyout_.isVisible()){
            if(BLOCK_SELECTED_FOR_MOVE!=null && cursorPosition[2] > 200){
                BLOCK_SELECTED_FOR_MOVE.unselectForOtherMove()
            }

            var blocksBoundary = FLYOUT_RANGE[control.chosenDrawer];
            if(blocksBoundary != null){
                for(var i=0 ; i<(blocksBoundary.length-1); i++){
                    var currentX = cursorPosition[0];
                    if(blocksBoundary[i] < currentX && currentX < blocksBoundary[i+1]){

                        this.candidateBlock = Blockly.mainWorkspace.toolbox_.flyout_.currentBlocks[i];
                        this.candidateBlock.select();

                        break;
                    }
                }
            }
        }
    }


    Control.prototype.getBlockFromViewer = function(cursorPosition){
		if(this.candidateBlock !=null){
			this.currentBlock = this.candidateBlock;
            this.currentBlock.blockSvg.selectForMove();
			this.currentBlock.highlight();
			this.candidateBlock = null;
		}
		
	}

	
	Control.prototype.getBlockFromDrawer = function(cursorPosition){
		if(Blockly.mainWorkspace.toolbox_.flyout_.isVisible() && Blockly.selected != null ){
			var blockElement = Blockly.mainWorkspace.toolbox_.tree_.getChildren()[0].blocks[0];
			var newBlockSvg = Blockly.mainWorkspace.toolbox_.flyout_.placeNewBlock_(Blockly.selected);
			this.currentBlock = new Block(newBlockSvg, cursorPosition);
            this.currentBlock.highlight();
            this.blocks.push(this.currentBlock);
            this.closeFlyout();
            this.candidateBlock = null;
            this.currentBlock.blockSvg.selectForMove()
			
		}
		
	}
	
	Control.prototype.moveHoldingBlock = function(cursorPosition){
		
		if(BLOCK_SELECTED_FOR_MOVE== this.currentBlock.blockSvg){
			this.currentBlock.move(cursorPosition);
		}
	}
	
	Control.prototype.stopMovingBlock = function(){	

		this.currentBlock.stopMove();
		this.currentBlock = null;
		if(Blockly.selected){
			Blockly.selected.unselect();
		}

	}

	Control.prototype.listenForConnection = function(){
		
		var candidate = this.currentBlock.getClosestConnection();
		if(candidate != null){

			candidate[0].connect(candidate[1]);
		}
	}

	//function that is called whenever the user hovers over the variable
	//since the user could have made more variables
	Control.prototype.getVariableBlocksPosition = function(){

		if(control.chosenDrawer =="Variables"){
            //empty
            FLYOUT_BLOCKS_WIDTHS["Variables"] = [];
            FLYOUT_RANGE["Variables"] = [];

            //first get the blocks' widths
            var blockElements = Blockly.mainWorkspace.toolbox_.flyout_.currentBlocks
            for(var i=0; i<blockElements.length; i++){
                var blockSvg = blockElements[i];
				var width = blockSvg.width;
				FLYOUT_BLOCKS_WIDTHS["Variables"].push(width);
            }

            //not get the range of each block
            var precedingBound = 0;
			var count = 0;
            var offset = 121 + 8 + Blockly.Flyout.prototype.GAP_X; //have to ignore the big button on the left
            var positions = FLYOUT_BLOCKS_WIDTHS["Variables"];
            FLYOUT_RANGE["Variables"].push(-50);
            positions.forEach(function(blockLength){
                var thisBound;
                if(count == 0){
                    thisBound = offset + blockLength + Blockly.Flyout.prototype.GAP_X*0.8/2;
                }else{
                    thisBound = precedingBound + blockLength + Blockly.Flyout.prototype.GAP_X*0.8;
                }
                FLYOUT_RANGE["Variables"].push(thisBound);
                precedingBound = thisBound;
                count += 1;
            });
		}

	}
	
	Control.prototype.getBlocksPositionInFlyout = function(){
		var flyouts = Blockly.mainWorkspace.toolbox_.tree_.getChildren()
		for(var i=0 ; i<COUNT_DRAWERS  ; i++){
			var blockElements = flyouts[i].blocks;
			if(typeof(blockElements) == "object"){
                blockElements.forEach(function(blockElement){

					var blockSvg = Blockly.Xml.domToBlock(Blockly.mainWorkspace, blockElement);
					var width = blockSvg.width;
					blockSvg.dispose();
					FLYOUT_BLOCKS_WIDTHS[BLOCK_CATEGORIES[i]].push(width);

                });
			}
		}		
	}
	
	Control.prototype.getBlockSectionRange = function(){
		var offset = 8;
		for(var i=0 ; i<COUNT_DRAWERS; i++){
			var positions = FLYOUT_BLOCKS_WIDTHS[BLOCK_CATEGORIES[i]];
			FLYOUT_RANGE[BLOCK_CATEGORIES[i]].push(-50);
			
			var precedingBound = 0;
			var count = 0;

			positions.forEach(function(blockLength){
				var thisBound;
				if(count == 0){
					thisBound = offset + blockLength + Blockly.Flyout.prototype.GAP_X/2;
				}else{
                    thisBound = precedingBound + blockLength + Blockly.Flyout.prototype.GAP_X;
				}
				FLYOUT_RANGE[BLOCK_CATEGORIES[i]].push(thisBound);
				precedingBound = thisBound;
				count += 1;
			});
			
		}
		
	}
	

	Control.prototype.deleteAll = function(){
		this.blocks.forEach(function(block){
			block.blockSvg.dispose(false, true);
			
		});
		this.blocks = [];
		
	}


    Control.prototype.highlightCon = function(){

        //Blockly.selected && Blockly.highlightedConnection_ && a != Blockly.DELETE_AREA_TOOLBOX ? (Blockly.localConnection_.connect(Blockly.highlightedConnection_),
        if(this.currentBlock.blockSvg!=null && Blockly.highlightedConnection_!=null){
            Blockly.localConnection_.connect(Blockly.highlightedConnection_);
            if(Blockly.localConnection_.isSuperior()){
                Blockly.highlightedConnection_.getSourceBlock().connectionUiEffect();
            }else{
                Blockly.localConnection_.getSourceBlock().connectionUiEffect();
            }
        }
        if(Blockly.highlightedConnection_ !=null){
            Blockly.highlightedConnection_.unhighlight();
            Blockly.highlightedConnection_ = null;
        }

    }


    Control.prototype.deleteBlock = function(){
        if(this.candidateBlock){
            var idx = this.blocks.indexOf(this.candidateBlock)
            if(idx > -1){
                this.candidateBlock.blockSvg.dispose(false, true);
                this.blocks.splice(idx,1)
                BLOCK_SELECTED_FOR_MOVE = null;
            }
            console.log("deleted")
        }
    }
