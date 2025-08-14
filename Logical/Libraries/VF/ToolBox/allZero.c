
#include <bur/plctypes.h>
#ifdef __cplusplus
	extern "C"
	{
#endif
	#include "ToolBox.h"
#ifdef __cplusplus
	};
#endif

#include "string.h"

/* Check if all the data is zero */
plcbit allZero( UDINT pData, UINT size )
{	
	switch(size){
		case 0: return 1;
		case 1: return  (*(char*)pData == 0);
		default: return (*(char*)pData == 0) && memcmp(pData, pData + 1, size - 1) == 0;	
	}
}